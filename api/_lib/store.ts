import { initialAgentState } from '../../src/agentDemo.js'
import type { AgentState } from '../../src/types.js'

function env(name: string): string | undefined { return process.env[name] }

export function cloudConfigured() { return Boolean(env('SUPABASE_URL') && env('SUPABASE_SERVICE_ROLE_KEY')) }

export async function loadAgentState(): Promise<AgentState> {
  const baseUrl = env('SUPABASE_URL')
  const key = env('SUPABASE_SERVICE_ROLE_KEY')
  if (!baseUrl || !key) return initialAgentState
  const response = await fetch(`${baseUrl}/rest/v1/agent_state?id=eq.wayfinder-watch&select=payload`, { headers: { apikey: key, Authorization: `Bearer ${key}` } })
  if (!response.ok) throw new Error(`Persistence read failed (${response.status})`)
  const rows = await response.json() as Array<{ payload: AgentState }>
  return rows[0]?.payload ?? initialAgentState
}

export async function saveAgentState(state: AgentState): Promise<AgentState> {
  const persisted = { ...state, mode: cloudConfigured() ? 'cloud' as const : state.mode, lastUpdated: new Date().toISOString() }
  const baseUrl = env('SUPABASE_URL')
  const key = env('SUPABASE_SERVICE_ROLE_KEY')
  if (!baseUrl || !key) return persisted
  const response = await fetch(`${baseUrl}/rest/v1/agent_state?on_conflict=id`, {
    method: 'POST',
    headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', Prefer: 'resolution=merge-duplicates,return=minimal' },
    body: JSON.stringify({ id: 'wayfinder-watch', payload: persisted, updated_at: persisted.lastUpdated }),
  })
  if (!response.ok) throw new Error(`Persistence write failed (${response.status})`)
  return persisted
}

export function requestAuthorized(request: Request, cron = false) {
  const authorization = request.headers.get('authorization')
  if (cron) return Boolean(env('CRON_SECRET') && authorization === `Bearer ${env('CRON_SECRET')}`)
  if (env('ALLOW_DEMO_ADMIN') === 'true') return true
  return Boolean(env('ADMIN_API_KEY') && authorization === `Bearer ${env('ADMIN_API_KEY')}`)
}

export function json(data: unknown, status = 200) {
  return Response.json(data, { status, headers: { 'Cache-Control': 'no-store' } })
}
