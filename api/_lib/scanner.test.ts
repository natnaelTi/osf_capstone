import { afterEach, describe, expect, it } from 'vitest'
import { initialAgentState } from '../../src/agentDemo'
import { scan } from './scanner'
import { sourceUrlAllowed } from './sourceSecurity'

const originalHosts = process.env.ALLOWED_SOURCE_HOSTS
const originalOpenAi = process.env.OPENAI_API_KEY

afterEach(() => {
  process.env.ALLOWED_SOURCE_HOSTS = originalHosts
  process.env.OPENAI_API_KEY = originalOpenAi
})

describe('Wayfinder Watch scanner boundaries', () => {
  it('runs one predictable, explicitly controlled finding without network access', async () => {
    delete process.env.OPENAI_API_KEY
    const next = await scan(initialAgentState, 'controlled-demo')
    expect(next.runs[0].trigger).toBe('controlled-demo')
    expect(next.runs[0].changesDetected).toBe(1)
    expect(next.findings[0].controlledDemo).toBe(true)
    expect(next.findings[0].stage).toBe('curator-review')
  })

  it('rejects local and non-allowlisted scan destinations', () => {
    process.env.ALLOWED_SOURCE_HOSTS = 'nbe.gov.et,justice.gov.et'
    expect(sourceUrlAllowed('https://nbe.gov.et/directives/')).toBe(true)
    expect(sourceUrlAllowed('http://nbe.gov.et/directives/')).toBe(false)
    expect(sourceUrlAllowed('https://127.0.0.1/internal')).toBe(false)
    expect(sourceUrlAllowed('https://example.com/')).toBe(false)
  })
})
