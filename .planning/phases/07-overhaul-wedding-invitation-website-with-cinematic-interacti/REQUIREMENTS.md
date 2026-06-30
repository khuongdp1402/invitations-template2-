# Phase 7 Requirements: Overhaul wedding invitation website with cinematic, interactive storytelling experience

Act as an expert Frontend Developer and UI/UX Designer specializing in Next.js, React, and modern animation libraries (Framer Motion, GSAP). I want to completely overhaul my wedding invitation website with a cinematic, highly interactive, and storytelling experience. 

Here is the detailed specification for the layout, color system, structure, and opening animations:

---

### 1. INITIAL COVER & OPENING ANIMATION (The Envelope Experience)
- **Current State:** A static red envelope with a clickable button that instantly disappears (display: none).
- **New Requirement:** Transform this into a realistic, fluid 3D-like digital envelope opening experience using Framer Motion or GSAP.
- **Visual Design:** 
  - Center a premium Burgundy Red envelope (#800020 or extracted from the wedding photo) over a soft cream/ivory background with subtle floating gold confetti/dust particles.
  - The envelope has a top flap with a circular gold "K&H" wax seal acting as the interactive button.
- **The "Open" Interaction Sequence (On Click Wax Seal):**
  1. **Wax Seal Pop:** The wax seal scales down slightly, rotates 15 degrees, and fades out as if broken.
  2. **Flap Flip:** The top flap of the envelope rotates upward on its X-axis (using CSS 3D transforms `rotateX(-180deg)`) to reveal the inside.
  3. **Letter Slide Out:** The wedding invitation card inside smooth-slides UP out of the envelope container.
  4. **Immersive Transition:** The card expands to fill the entire viewport, while the background smoothly morphs/fades into the "Hero Section" of the website. The envelope elements gently fade out.

---

### 2. DYNAMIC COLOR-BLOCKING & STORYTELLING FLOW
Instead of a single static background, the website must utilize a smooth color-blocking transition where the background color dynamically morphs using Framer Motion (`animate={{ backgroundColor: ... }}`) based on the scrolling section or active state.

#### Section 1: Hero Banner (Cinematic 3D Layering)
- **Background Color:** Deep Burgundy Red (matching the red backdrop photo).
- **Content Layout:** 
  - **Front Layer:** A perfectly cut-out (transparent background) image of the couple in front of the red studio backdrop.
  - **Back Layer:** Large bold elegant Serif typography text (e.g., "KHƯƠNG & HIỀN" or "THE WEDDING") rendered in an off-white/ivory tone, positioned partially BEHIND the couple's shoulders/heads to create an immersive 3D depth effect.
  - **Interaction:** Add a small "Next Layout" or toggle button. When clicked, it smoothly triggers an active state that slides in an alternative couple photo with a different pose, morphing the background color seamlessly to a warm Terracotta/Clay tone.

#### Section 2: Our Journey (Interactive Hover Gallery)
- **Background Color:** Morphs into a clean **Smoke White / Ultra-light Grey** to emphasize the colors of the photos.
- **Concept:** A clean, minimalist interactive timeline. Only textual milestone titles are visible at first (e.g., "First Meeting", "First Trip", "The Proposal").
- **Interaction:** When a user hovers over a milestone (or taps on mobile), a gorgeous corresponding photo from the "Lễ Hằng Thuận" ceremony (with the couple wearing traditional soft blue/grey "áo lam") smoothly fades and scales up into a dedicated preview box or floating next to the cursor, creating a pure, serene, and emotional storytelling flow.

#### Section 3: The Invitation & The Arch (Unified View)
- **Background Color:** Transitions into a soft, warm **Latte Cream**.
- **The Arch Shape Box:** Replace the generic placeholder with an elegant arched window mask (`clip-path` or SVG mask) containing a romantic pre-wedding photo (e.g., the close-up photo where the couple touches noses and the groom holds a warm-toned autumn bouquet). 
- **UX Goal:** The warm tones of the image must blend flawlessly with the Latte Cream background, making it feel like an architectural window into their love story.

#### Section 4: Candid Memories (Draggable Polaroid Stack)
- **Background Color:** Changes into a cozy, organic **Taupe / Muted Earthy Brown**, simulating a wooden table surface.
- **Layout:** A messy, scattered stack of 5–7 casual, behind-the-scenes, or daily dating photos styled with white Polaroid borders and slight randomized rotations.
- **Interaction:** Implement dragging capabilities using Framer Motion `<motion.div drag dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} dragElastic={0.7} />`. Guests can playfully drag, flick, and rearrange the photos to look at the memories underneath.

#### Section 5: Studio Showcase & RSVP (The Grand Finale)
- **Background Color:** Transitions to a sharp, high-contrast **Pure White Studio Backdrop**.
- **Layout:** A full-bleed/large-screen responsive Image Carousel showing the high-end minimalist Korean-style studio wedding photos (couple in elegant white gown and black/white suits).
- **RSVP Form Area:** Placed neatly below the gallery inside a sophisticated semi-transparent glass container (Glassmorphism: `backdrop-filter: blur(10px)`). The primary action button (Submit RSVP) should be styled in the signature Deep Burgundy Red to match the opening envelope, wrapping up the visual journey cohesively.

---

### 3. TECHNICAL & RESPONSIVE REQUIREMENTS
- **Performance:** Ensure all large wedding images are optimized (use Next.js `<Image />` component with correct layouts/priorities).
- **Mobile Adaptability:** 
  - On touch devices, the "Hover Gallery" in Section 2 must fall back to a "Tap to reveal/toggle" mechanism.
  - The Draggable Stack in Section 4 must support fluid touch gestures without blocking the page's vertical scrolling.
- **Gradients:** Use soft, seamless CSS linear gradients at section wrappers to ensure background colors morph into each other softly without harsh line breaks during scroll.

về phần 3d banner ban đầu, tham khảo E:\Project\Kinetic3D\Kinetic3D\src\Kinetic3D.WebUI đang có banner mẫu 
