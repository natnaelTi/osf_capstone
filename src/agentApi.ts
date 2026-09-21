import { createControlledDemoRun, initialAgentState } from './agentDemo'
import type { AgentConfig, AgentState, MonitorSource } from './types'

const storageKey = 'wayfinder-watch-demo-state'
function readDemoState() { try { const saved = window.localStorage.getItem(storageKey); return saved ? JSON.parse(saved) as AgentState : initialAgentState } catch { return initialAgentState } }
function writeDemoState(state: AgentState) { try { window.localStorage.setItem(storageKey, JSON.stringify(state)) } catch { /* Storage may be unavailable in privacy modes. */ } return state }

async function jsonRequest<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...init?.headers },
  })
  if (!response.ok) throw new Error(`Agent API returned ${response.status}`)
  return response.json() as Promise<T>
}

export async function loadAgentState(): Promise<AgentState> {
  try {
    return await jsonRequest<AgentState>('/api/agent/state')
  } catch {
    return readDemoState()
  }
}

export async function runAgent(state: AgentState, controlledDemo: boolean): Promise<AgentState> {
  try {
    return await jsonRequest<AgentState>('/api/agent/run', {
      method: 'POST',
      body: JSON.stringify({ controlledDemo }),
    })
  } catch {
    if (!controlledDemo) throw new Error('The live cloud scanner is unavailable. Use the clearly labeled controlled demonstration instead.')
    await new Promise(resolve => window.setTimeout(resolve, 650))
    return writeDemoState(createControlledDemoRun(state))
  }
}

export async function saveAgentConfig(state: AgentState, config: AgentConfig, sources: MonitorSource[]): Promise<AgentState> {
  try {
    return await jsonRequest<AgentState>('/api/agent/config', {
      method: 'PUT',
      body: JSON.stringify({ config, sources }),
    })
  } catch {
    return writeDemoState({ ...state, config, sources, mode: 'controlled-demo', lastUpdated: new Date().toISOString() })
  }
}

export async function updateFindingStage(state: AgentState, findingId: string, stage: AgentState['findings'][number]['stage']): Promise<AgentState> {
  try {
    return await jsonRequest<AgentState>('/api/agent/finding', { method: 'PATCH', body: JSON.stringify({ findingId, stage }) })
  } catch {
    return writeDemoState({ ...state, findings: state.findings.map(item => item.id === findingId ? { ...item, stage } : item), lastUpdated: new Date().toISOString() })
  }
}
