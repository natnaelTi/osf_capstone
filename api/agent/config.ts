import type { AgentConfig, MonitorSource } from '../../src/types.js'
import { json, loadAgentState, requestAuthorized, saveAgentState } from '../_lib/store.js'
import { sourceUrlAllowed } from '../_lib/sourceSecurity.js'

export default { async fetch(request: Request) {
  if (request.method !== 'PUT') return json({ error: 'Method not allowed' }, 405)
  if (!requestAuthorized(request)) return json({ error: 'Administrator authorization required' }, 401)
  const body = await request.json() as { config?: AgentConfig; sources?: MonitorSource[] }
  if (!body.config || !Array.isArray(body.sources) || body.sources.some(source => !sourceUrlAllowed(source.url))) return json({ error: 'A complete configuration and allowlisted public HTTPS sources are required' }, 400)
  const current = await loadAgentState()
  return json(await saveAgentState({ ...current, config: body.config, sources: body.sources, health: body.config.enabled ? 'active' : 'paused' }))
} }
