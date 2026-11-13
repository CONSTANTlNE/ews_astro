// Runs only for /api/* (see run_worker_first in wrangler.jsonc). Everything else is served as static files.
// GitHub OAuth proxy for Sveltia/Decap CMS:  GET /api/auth  ·  GET /api/callback
const SCOPE = 'repo,user'; // use 'public_repo,user' if the repo is public
const clearState = 'oauth_state=; Path=/api; Max-Age=0; HttpOnly; Secure; SameSite=Lax';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/auth') {
      const state = crypto.randomUUID();
      const gh = new URL('https://github.com/login/oauth/authorize');
      gh.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
      gh.searchParams.set('redirect_uri', `${url.origin}/api/callback`);
      gh.searchParams.set('scope', SCOPE);
      gh.searchParams.set('state', state);
      return new Response(null, {
        status: 302,
        headers: { Location: gh.href, 'Set-Cookie': `oauth_state=${state}; Path=/api; Max-Age=600; HttpOnly; Secure; SameSite=Lax` },
      });
    }

    if (url.pathname === '/api/callback') {
      const code = url.searchParams.get('code');
      const state = url.searchParams.get('state');
      const cookieState = /(?:^|;\s*)oauth_state=([^;]+)/.exec(request.headers.get('Cookie') || '')?.[1];
      if (!code || !state || state !== cookieState) return result('error', { error: 'Invalid OAuth state' }, url.origin);

      const res = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'User-Agent': 'site-cms-auth' },
        body: JSON.stringify({ client_id: env.GITHUB_CLIENT_ID, client_secret: env.GITHUB_CLIENT_SECRET, code }),
      });
      const data = await res.json();
      if (!data.access_token) return result('error', { error: data.error_description || 'Token exchange failed' }, url.origin);
      return result('success', { token: data.access_token, provider: 'github' }, url.origin);
    }

    return new Response('Not found', { status: 404 });
  },
};

// The CMS (/admin/) is on the same origin, so the token may only be delivered to this origin.
function result(status, content, origin) {
  const msg = `authorization:github:${status}:${JSON.stringify(content)}`;
  return new Response(
    `<!doctype html><meta charset="utf-8"><title>Authorizing…</title><body><script>
      (function () {
        window.addEventListener('message', function (e) {
          if (e.origin !== ${JSON.stringify(origin)}) return;
          window.opener.postMessage(${JSON.stringify(msg)}, e.origin);
          window.close();
        });
        window.opener.postMessage('authorizing:github', '*');
      })();
    </script></body>`,
    { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Set-Cookie': clearState } },
  );
}
