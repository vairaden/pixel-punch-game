export function getHostName() {
  return typeof window === 'undefined' ? 'localhost' : window.location.hostname;
}
