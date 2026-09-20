# Regulatory UX

Read this for discovery, workflow definition, or consequential guidance screens.

## Frame the decision

Capture:

- user and organizational role;
- triggering transaction or event;
- jurisdiction and relevant dates;
- decision the user must make;
- consequence of acting, delaying, or being wrong;
- evidence required to justify output;
- missing facts and assumptions;
- appropriate reviewer when automation should stop.

## Evidence-to-action chain

Every recommendation should support this trace:

`Transaction fact → applicable provision → interpretation → obligation → action → deadline → review state`

The interface may summarize the chain, but it must not break it.

## Progressive disclosure

The first view answers “What should I do now?” The next layer explains “Why?” The evidence layer answers “According to exactly what?” The review layer answers “What remains uncertain, and who decides?”

## State inventory

Consider: no transaction, incomplete input, unsupported transaction, source unavailable, stale source, extraction pending, conflict found, interpretation pending, professional review requested, resolved review, changed source, superseded output, offline, permission denied, and failed generation.

Only implement states that can arise in the chosen slice, but do not design only the happy path.

