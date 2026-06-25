# Phase 07: Overhaul wedding invitation website with cinematic, interactive storytelling experience - Research

## Research Objective
Identify implementation strategies and existing patterns to execute the cinematic, interactive visual overhaul using Next.js, Framer Motion, and GSAP.

## Findings

### 1. Existing Patterns & Codebase Context
- **3D Banner Reference (`Kinetic3D.WebUI/src/components/storefront/Hero.tsx`)**:
  - Uses `gsap.timeline` with `useRef` to orchestrate clip-path reveals (`clipPath: polygon()`), opacity fades, and staggered Y-axis translations (`y: 40` to `y: 0`).
  - Utilizes standard CSS transform perspective on parent containers (`perspective-[1000px]`) combined with child `rotate` and `translate` for 3D layering effects.
  - Hover states trigger subtle tilt/shake animations (e.g., `hover:animate-[shake-tilt...]`).

### 2. Envelope Experience Implementation
- **Framer Motion vs GSAP**: 
  - GSAP is better suited for the complex multi-step timeline (Wax seal pop -> Flap flip -> Letter slide out -> Immersive transition). 
  - CSS 3D transforms (`rotateX(-180deg)`) applied via GSAP with `transform-origin: top` will create the flap flip.
  - Expanding the card to fill the viewport can be handled via CSS `position: absolute` or `fixed` transitions orchestrated by GSAP's `Flip` plugin or Framer Motion's `layoutId`.

### 3. Dynamic Color-Blocking
- **Implementation Strategy**:
  - `framer-motion`'s `useScroll` combined with `useTransform` is ideal to interpolate background colors based on scroll progress smoothly.
  - Alternatively, GSAP `ScrollTrigger` can trigger tweens that animate the background color of the main wrapper. Given the user's preference for GSAP in existing references, `ScrollTrigger` is highly recommended.
  - Soft seamless transitions: The wrapper container should animate its `backgroundColor` property directly.

### 4. Interactive Hover Gallery & Polaroid Stack
- **Hover Gallery**: 
  - Framer Motion's `AnimatePresence` and `motion.div` are perfect for the "fade and scale on hover" preview box.
  - On mobile, standard React state (`activeMilestone`) combined with an `onClick` toggle will handle the tap-to-reveal fallback.
- **Polaroid Stack**:
  - Framer Motion provides built-in drag logic: `<motion.div drag dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} dragElastic={0.7} />`.
  - Stacking order needs to be managed (e.g., bringing the dragged photo to the top via `zIndex` state).

### 5. Hero Banner Parallax
- **Implementation**:
  - Listen to `mousemove` events on the window or container.
  - Calculate normalized X and Y offsets (`-1` to `1`).
  - Apply offsets with multipliers to different layers (front layer moves more than back layer) using GSAP `quickTo` or Framer Motion `useSpring`.

## Risks & Considerations
- **Performance**: Heavy use of filters (`backdrop-filter: blur()`) in Section 5 and continuous mouse event listeners for parallax can drop frames on lower-end devices. RequestAnimationFrame should throttle mouse events, or Framer Motion's `useSpring` should be used.
- **Z-Index Management**: Transitioning from the envelope cover to the scrolling content requires careful z-index and `pointer-events` orchestration so the underlying site becomes interactive exactly when the envelope fades out.

## RESEARCH COMPLETE
