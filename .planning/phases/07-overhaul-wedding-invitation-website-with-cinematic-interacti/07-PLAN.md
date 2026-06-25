---
wave: 1
depends_on: []
files_modified:
  - "app/page.jsx"
  - "app/globals.css"
  - "components/ui/SplashScreen.jsx"
  - "components/sections/HeroSection.jsx"
  - "components/sections/OurJourney.jsx"
  - "components/sections/TheArch.jsx"
  - "components/sections/CandidMemories.jsx"
  - "components/sections/StudioShowcaseRSVP.jsx"
autonomous: true
---

# Phase 07: Overhaul wedding invitation website with cinematic, interactive storytelling experience - Plan

## Tasks

<task>
<description>Implement 3D Envelope Opening Experience (SplashScreen / Envelope)</description>
<read_first>
- app/page.jsx
- components/ui/SplashScreen.jsx
- .planning/phases/07-overhaul-wedding-invitation-website-with-cinematic-interacti/REQUIREMENTS.md
</read_first>
<action>
1. Replace static red envelope in `components/ui/SplashScreen.jsx` with a GSAP timeline.
2. Add elements for the Wax Seal (circle), Top Flap, and Inner Card.
3. On Wax Seal click:
   - Scale down, rotate 15deg, fade out the Wax Seal.
   - Apply `rotateX(-180deg)` to the Top Flap using GSAP.
   - Slide up the Inner Card from inside the envelope container.
   - Expand the Inner Card to `width: 100vw`, `height: 100vh` and fade out envelope elements.
4. Mount the main website (Hero Section) behind the expanding card or seamlessly transition.
</action>
<acceptance_criteria>
- `components/ui/SplashScreen.jsx` contains GSAP timeline for the opening sequence.
- Flap animation includes `rotateX(-180deg)`.
</acceptance_criteria>
</task>

<task>
<description>Implement Dynamic Color-Blocking across Sections</description>
<read_first>
- app/page.jsx
- app/globals.css
</read_first>
<action>
1. Add a GSAP ScrollTrigger to the main container or use Framer Motion `useScroll` to interpolate the global background color.
2. Define the colors per section:
   - Hero: `#800020` (Deep Burgundy Red)
   - Journey: `#F5F5F5` (Smoke White)
   - Arch: `#FFF5E1` (Latte Cream)
   - Memories: `#8B7355` (Taupe / Muted Earthy Brown)
   - RSVP: `#FFFFFF` (Pure White)
3. Apply the dynamic background color to the main layout wrapper in `app/page.jsx`.
</action>
<acceptance_criteria>
- `app/page.jsx` contains ScrollTrigger or Framer Motion logic animating `backgroundColor`.
- All 5 specific hex codes/colors are present in the color mapping array.
</acceptance_criteria>
</task>

<task>
<description>Implement Hero Banner with 3D Parallax Effect</description>
<read_first>
- components/sections/HeroSection.jsx
- E:/Project/Kinetic3D/Kinetic3D/src/Kinetic3D.WebUI/src/components/storefront/Hero.tsx
</read_first>
<action>
1. Refactor `HeroSection.jsx` to include front and back layers.
2. Implement mouse movement tracking using `useEventListener` or React `onMouseMove`.
3. Apply `x` and `y` translation offsets (parallax) to the front image and back text layers using GSAP `quickTo` or Framer Motion `useSpring`.
4. Add a "Next Layout" toggle button to slide in an alternative couple photo and trigger a color shift to Terracotta/Clay tone.
</action>
<acceptance_criteria>
- `HeroSection.jsx` tracks mouse coordinates.
- Front layer and back text layer use dynamic translation styles based on mouse position.
</acceptance_criteria>
</task>

<task>
<description>Implement Interactive Hover Gallery & Unified Arch View</description>
<read_first>
- components/sections/OurJourney.jsx
- components/sections/TheArch.jsx
</read_first>
<action>
1. Update `OurJourney.jsx` to list text-only milestones.
2. Add `onMouseEnter` / `onClick` handlers to show corresponding images via Framer Motion `AnimatePresence`.
3. Update `TheArch.jsx` to use an elegant arched SVG mask or `clip-path: ellipse()` containing the pre-wedding photo.
</action>
<acceptance_criteria>
- `OurJourney.jsx` uses `AnimatePresence` for image reveals.
- `TheArch.jsx` includes `clip-path` or `<svg><mask/></svg>` styling for the arched window.
</acceptance_criteria>
</task>

<task>
<description>Implement Draggable Polaroid Stack and RSVP Form</description>
<read_first>
- components/sections/CandidMemories.jsx
- components/sections/StudioShowcaseRSVP.jsx
</read_first>
<action>
1. In `CandidMemories.jsx`, render 5-7 Polaroid-style photos.
2. Wrap each photo in a Framer Motion `<motion.div drag dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} dragElastic={0.7} />`.
3. In `StudioShowcaseRSVP.jsx`, add a full-bleed carousel and a RSVP form.
4. Apply `backdrop-filter: blur(10px)` to the RSVP form container and style the submit button Deep Burgundy Red (`#800020`).
</action>
<acceptance_criteria>
- `CandidMemories.jsx` contains `<motion.div drag` and `dragConstraints`.
- `StudioShowcaseRSVP.jsx` contains `backdrop-filter: blur(10px)`.
</acceptance_criteria>
</task>

## Verification

### Automated
- `npm run build` completes without TypeScript errors.

### Manual
- Start the server and verify the envelope opening animation plays flawlessly on click.
- Verify background color morphs smoothly when scrolling down through the sections.
- Verify polaroids can be dragged and flicked with elastic bounce-back.
- Verify parallax effect reacts to mouse movement in the Hero section.
