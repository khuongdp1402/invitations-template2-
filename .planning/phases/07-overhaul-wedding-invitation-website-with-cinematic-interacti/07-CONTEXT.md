# Phase 07: Overhaul wedding invitation website with cinematic, interactive storytelling experience - Context

**Gathered:** 2026-06-25
**Status:** Ready for planning

<domain>
## Phase Boundary

Complete visual overhaul with an interactive 3D envelope opening, dynamic color-blocking backgrounds, and cinematic storytelling sections.
</domain>

<decisions>
## Implementation Decisions

### Hero Banner 3D Effect
- The depth layers will react to mouse movement & device tilt (parallax) to create a floating, highly interactive feel that matches the "cinematic" goal.

### Initial Cover & Opening Animation
- Realistic 3D envelope opening with wax seal pop, flap flip, and letter slide out.
- Immersive transition: card expands to full viewport, background morphs to Hero Section.

### Dynamic Color-Blocking
- Background color dynamically morphs based on scrolling section.
- Section 1 (Hero): Deep Burgundy Red.
- Section 2 (Our Journey): Smoke White / Ultra-light Grey.
- Section 3 (The Arch): Latte Cream.
- Section 4 (Candid Memories): Taupe / Muted Earthy Brown.
- Section 5 (RSVP): Pure White Studio Backdrop.

### Our Journey (Section 2)
- Interactive Hover Gallery: Minimalist timeline, photo fades and scales on hover (or tap on mobile).

### The Arch (Section 3)
- Elegant arched window mask (clip-path/SVG) containing romantic pre-wedding photo.

### Candid Memories (Section 4)
- Draggable Polaroid Stack: Scattered photos with Framer Motion drag capabilities.

### Studio Showcase & RSVP (Section 5)
- Full-bleed image carousel.
- RSVP form in a semi-transparent glass container with Deep Burgundy Red submit button.

### Mobile Adaptability
- Hover gallery falls back to tap-to-reveal on mobile.
- Draggable stack supports fluid touch gestures without blocking vertical scroll.

### the agent's Discretion
- Exact layout and dimensions of the envelope and inner card.
- Tuning of the physics (spring stiffness, damping) for the drag interactions and parallax effect.
- Color transition interpolation settings.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements
- `.planning/phases/07-overhaul-wedding-invitation-website-with-cinematic-interacti/REQUIREMENTS.md` — Detailed user specifications for the layout, color system, and opening animations.
- `E:/Project/Kinetic3D/Kinetic3D/src/Kinetic3D.WebUI` — Reference for the initial 3D banner.

</canonical_refs>

<specifics>
## Specific Ideas
- Wax Seal Pop: Scale down, rotate 15deg, fade out.
- Flap Flip: rotateX(-180deg).
- Section wrappers need soft, seamless CSS linear gradients to avoid harsh line breaks.
- Deep Burgundy Red: #800020.
- Glassmorphism for RSVP: backdrop-filter: blur(10px).
- Images format: .webp or .avif, < 200KB.
</specifics>

<deferred>
## Deferred Ideas
None — scoping strictly bounded to the requested overhaul.
</deferred>

---

*Phase: 07-overhaul-wedding-invitation-website-with-cinematic-interacti*
*Context gathered: 2026-06-25*
