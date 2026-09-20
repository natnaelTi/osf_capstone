# Motion system

## Purpose

Motion explains causality, feedback, hierarchy, or spatial change. It must not make generated guidance appear more certain or authoritative.

## Frequency gate

| Frequency | Treatment |
| --- | --- |
| Rare onboarding or first reveal | Restrained expressive motion is acceptable |
| Occasional daily workflow | Subtle and fast |
| Frequent operational action | Instant or nearly instant |
| Keyboard-initiated action | No decorative animation |

## Durations

- Press/focus feedback: 80–120ms
- Small state transition: 140–180ms
- Popover or tooltip: 120–180ms
- Dialog, drawer, or panel: 180–240ms
- Major context change: up to 300ms when spatial continuity helps

Exit transitions should generally be faster than entrances.

## Patterns

- Expand evidence in place or into a clearly connected side panel.
- Animate checklist status only enough to confirm the change.
- When source updates affect guidance, reveal the changed relationship rather than pulsing the screen.
- Keep validation errors adjacent to the relevant field and move focus appropriately; avoid shake effects.
- Prefer `transform` and `opacity` over layout-triggering properties.

## Reduced motion

With `prefers-reduced-motion: reduce`, remove non-essential transforms, scroll choreography, parallax, and auto-animation. Render final states immediately while preserving functional feedback.

## Prohibited

- motion on every card or row;
- scroll-jacking or mandatory pinned narratives inside the application;
- looping status animation after processing finishes;
- celebratory motion for high-risk outcomes;
- motion that delays evidence or actions;
- animating uncertainty into apparent certainty.

