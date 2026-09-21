import { json, loadAgentState } from '../_lib/store.js'

export default { async fetch() { try { return json(await loadAgentState()) } catch (error) { return json({ error: error instanceof Error ? error.message : 'State unavailable' }, 503) } } }
