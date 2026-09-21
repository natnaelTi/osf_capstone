import type { FindingStage } from '../../src/types.js'
import { json, loadAgentState, requestAuthorized, saveAgentState } from '../_lib/store.js'

const stages: FindingStage[] = ['curator-review', 'policy-review', 'approved', 'dismissed']

export default { async fetch(request: Request) {
  if (request.method !== 'PATCH') return json({ error: 'Method not allowed' }, 405)
  if (!requestAuthorized(request)) return json({ error: 'Administrator or reviewer authorization required' }, 401)
  const body = await request.json() as { findingId?: string; stage?: FindingStage }
  if (!body.findingId || !body.stage || !stages.includes(body.stage)) return json({ error: 'Valid finding and stage are required' }, 400)
  const current = await loadAgentState()
  if (!current.findings.some(item => item.id === body.findingId)) return json({ error: 'Finding not found' }, 404)
  return json(await saveAgentState({ ...current, findings: current.findings.map(item => item.id === body.findingId ? { ...item, stage: body.stage! } : item) }))
} }
