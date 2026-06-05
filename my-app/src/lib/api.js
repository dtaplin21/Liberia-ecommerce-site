/**
 * Backend API base URL. Set VITE_API_URL in .env for production (e.g. https://api.theunnamedfarm.com).
 * Defaults to local FastAPI for development.
 */
export function getApiBaseUrl() {
  const configured = import.meta.env.VITE_API_URL?.trim()
  if (configured) {
    return configured.replace(/\/$/, '')
  }
  return 'http://localhost:8000'
}

export function apiUrl(path) {
  const base = getApiBaseUrl()
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${base}${normalized}`
}
