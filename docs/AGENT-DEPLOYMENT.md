# Wayfinder Watch deployment

Wayfinder Watch is operational when deployed with Vercel Functions, Vercel Cron, Supabase, and an OpenAI API key. Without cloud configuration, the interface remains usable in a clearly labeled controlled-demo mode.

## 1. Create the Supabase state table

Create a Supabase project, open its SQL editor, and run:

```text
supabase/migrations/202609210001_agent_state.sql
```

The browser receives no write policy. Server-side functions use the service-role key to persist the agent state.

## 2. Configure Vercel environment variables

Copy the names from `.env.example` into the Vercel project settings:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENAI_API_KEY`
- `OPENAI_MODEL`
- `CRON_SECRET`
- `ADMIN_API_KEY`
- `ALLOWED_SOURCE_HOSTS`
- `ALLOW_DEMO_ADMIN`

Keep service-role and AI keys server-side. Never prefix them with `VITE_`.

For the time-boxed judging preview, `ALLOW_DEMO_ADMIN=true` permits the role-demo interface to save configuration and run scans. Set it to `false` outside that preview; manual mutations will then require `Authorization: Bearer <ADMIN_API_KEY>`. Scheduled calls require the separate `CRON_SECRET`.

## 3. Deploy

Import the GitHub repository into Vercel and select the `codex/regulatory-product-setup` branch. Vercel builds the Vite frontend and the functions under `api/`. The `vercel.json` schedule calls `/api/agent/run` every six hours in UTC. The handler also checks the configured interval before scanning.

## 4. Establish the baseline

Enter the Platform Administrator demo role and select **Run live scan now**. The first successful run stores normalized SHA-256 fingerprints. A later difference creates a finding and invokes structured AI extraction when the OpenAI key is available.

## 5. Demonstrate a predictable change

Select **Run controlled change demo**. The run uses an explicitly labeled fixture, exercises extraction and review routing, and never claims that the regulator published the fixture. Use this path in the video if the official pages have not changed.

## Operational boundaries

- Only administrator-configured HTTPS sources are fetched.
- Server-side scanning enforces a public-host allowlist and rejects local/private destinations.
- Source text is normalized and fingerprinted; previous verified state is preserved after failures.
- AI output is labeled interpretation and starts in curator review.
- Consequential interpretation requires human approval.
- Every run records trigger, timestamps, sources checked, changes, findings, failures, and extraction mode.
- The scanner is intentionally bounded; it is not an unrestricted web crawler or legal-advice agent.
