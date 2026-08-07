// CSP's media-src only allows Cloudinary and this project's Vercel Blob
// store — a video URL still pointing at the old speakerhead.com host (or
// anywhere else) gets silently blocked by the browser, so gate rendering on
// the URL actually living on one of those two hosts.
const PLAYABLE_VIDEO_HOSTS = [
  "res.cloudinary.com",
  ".public.blob.vercel-storage.com",
];

export function canPlayVideo(url) {
  if (!url) return false;
  return PLAYABLE_VIDEO_HOSTS.some((host) => url.includes(host));
}
