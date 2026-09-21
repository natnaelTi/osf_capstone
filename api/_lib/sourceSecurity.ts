const defaultHosts = ['nbe.gov.et', 'justice.gov.et']

export function sourceUrlAllowed(value: string) {
  try {
    const url = new URL(value)
    if (url.protocol !== 'https:' || url.username || url.password || url.port) return false
    const hostname = url.hostname.toLowerCase()
    if (hostname === 'localhost' || hostname === '::1' || hostname.endsWith('.local') || /^(127\.|10\.|192\.168\.|169\.254\.)/.test(hostname)) return false
    const match172 = hostname.match(/^172\.(\d+)\./)
    if (match172 && Number(match172[1]) >= 16 && Number(match172[1]) <= 31) return false
    const allowed = (process.env.ALLOWED_SOURCE_HOSTS ?? defaultHosts.join(',')).split(',').map(item => item.trim().toLowerCase()).filter(Boolean)
    return allowed.some(host => hostname === host || hostname.endsWith(`.${host}`))
  } catch { return false }
}
