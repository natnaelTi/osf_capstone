create table if not exists public.agent_state (
  id text primary key,
  payload jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.agent_state enable row level security;

-- The service-role key used only by server-side functions bypasses RLS.
-- No browser write policy is created; public clients cannot mutate agent state.
create policy "public can read agent status"
on public.agent_state for select
to anon
using (id = 'wayfinder-watch');
