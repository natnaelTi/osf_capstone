import { json, loadAgentState, requestAuthorized, saveAgentState } from '../_lib/store.js'
import { runIsDue, scan } from '../_lib/scanner.js'

export default { async fetch(request: Request) {
  const scheduled = request.method === 'GET'
  if (scheduled ? !requestAuthorized(request, true) : !requestAuthorized(request)) return json({ error: 'Agent authorization required' }, 401)
  const current = await loadAgentState()
  if (!current.config.enabled) return json({ error: 'Agent is paused', state: current }, 409)
  if (scheduled && !runIsDue(current)) return json(current)
  const body = scheduled ? {} : await request.json().catch(() => ({})) as { controlledDemo?: boolean }
  const next = await scan({ ...current, health: 'scanning' }, body.controlledDemo ? 'controlled-demo' : scheduled ? 'scheduled' : 'manual')
  return json(await saveAgentState(next))
} }
