// Image helper. Content files store either an Unsplash id ("photo-123...") or a local path ("/images/x.jpg").
// Swap placeholders for real images by changing the value in the markdown frontmatter.
export function imgUrl(src: string, w = 1200, h?: number): string {
  if (src.startsWith('photo-')) {
    const base = `https://images.unsplash.com/${src}?auto=format&fit=crop&q=75&w=${w}`;
    return h ? `${base}&h=${h}` : base;
  }
  return src;
}
export function imgSrcset(src: string, widths: number[], ratio?: number): string | undefined {
  if (!src.startsWith('photo-')) return undefined;
  return widths.map((w) => `${imgUrl(src, w, ratio ? Math.round(w / ratio) : undefined)} ${w}w`).join(', ');
}
