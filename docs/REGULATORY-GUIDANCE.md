# Regulatory guidance model

## Information classes

Every consequential statement belongs to one class:

| Class | Meaning | Interface treatment |
| --- | --- | --- |
| Source evidence | Text or fact traceable to an authoritative document | Source identity, pinpoint, date/version, and access action |
| Extracted fact | Structured value derived directly from evidence | Mark as extracted and retain the evidence link |
| Interpretation | System reasoning about applicability or meaning | Label clearly and show assumptions and limits |
| Recommended action | Practical next step derived from evidence and interpretation | Owner, deadline, rationale, evidence, and status |
| Professional judgment | Decision or clarification by a qualified reviewer | Reviewer role, status, timestamp, and scope |

Do not style interpretation or action so it appears to be source text.

## Source record minimum

- issuing authority, title, document type, and jurisdiction;
- publication and effective dates when available;
- source URL or stored document identity;
- retrieval timestamp and version/content fingerprint;
- language, extraction status, and supersession relationship;
- pinpoint reference for cited passages.

## Review required

- conflicting sources;
- unclear applicability or incomplete evidence;
- probable supersession without confirmation;
- material tax, foreign-exchange, penalty, licensing, or filing consequence;
- recommendation depending on legal interpretation;
- source that cannot be verified as official.

The interface must explain why review is required and what input could resolve it.

## Conflict behavior

Never silently choose a winner. Show the conflicting propositions, each source and date, suspected reason, affected obligation, current safe status, and the exact question for the policy professional.

## Confidence language

Use concrete statuses: “Verified from source,” “Extracted; validation pending,” “Interpretation based on stated assumptions,” “Conflicting evidence,” “Professional review required,” and “Source may be outdated.” Avoid unsupported percentages or vague “AI confidence” badges.

## Disclaimer placement

A general disclaimer is not a substitute for point-of-use labeling. Put qualification beside the interpretation or action it affects.

