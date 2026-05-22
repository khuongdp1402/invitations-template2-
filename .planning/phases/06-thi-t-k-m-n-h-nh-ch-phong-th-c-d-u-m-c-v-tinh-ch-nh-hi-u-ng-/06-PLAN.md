## Phase 6 Plan

**Wave 1:**

<task>
  <read_first>app/wedding/page.jsx</read_first>
  <action>
    Create a new React component at `components/ui/transitions/EnvelopeWelcome.jsx`.
    This component should:
    1. Act as a fixed overlay (`fixed inset-0 z-[100]`) covering the whole screen.
    2. Read URL search params (`?name=...`) using `useSearchParams` to display "Hello [Name]" (or "Hello" if missing).
    3. Display the text "Khương và Hiền mời bạn mở thiệp cưới".
    4. Implement a CSS-based Wax Seal with initials K & H.
    5. Be clickable. On click, trigger a Framer Motion animation to fade out / slide open the envelope, unlock scrolling (if locked), and then `display: none` or unmount.
    
    Then, modify `app/wedding/page.jsx` to import and render `<EnvelopeWelcome />` at the top level.
    Also, find and remove the `TypographyBreak` component (the "Our Story" section) from `app/wedding/page.jsx`.
  </action>
  <acceptance_criteria>
    - `components/ui/transitions/EnvelopeWelcome.jsx` exists and uses Framer Motion.
    - `app/wedding/page.jsx` contains `<EnvelopeWelcome />`.
    - `app/wedding/page.jsx` DOES NOT contain `<TypographyBreak />`.
  </acceptance_criteria>
</task>

**Wave 2:**

<task>
  <read_first>lib/canvas/Particle.js, lib/canvas/ParticleEngine.js</read_first>
  <action>
    Refactor particle physics to implement gravity and bottom accumulation.
    
    In `lib/canvas/ParticleEngine.js`:
    - Change particle defaults: `this.particleCount = window.innerWidth < 768 ? 40 : 70;`
    
    In `lib/canvas/Particle.js`:
    - Update `reset` to spawn at the top of the canvas: `this.y = isInit ? Math.random() * canvasHeight : Math.random() * -100;`
    - Update `update` method to apply gravity instead of anti-gravity: `this.y += (this.baseSpeed + scrollVelocity * 0.5);`
    - Implement bottom accumulation:
      ```javascript
      if (this.y > canvasHeight - 100) {
        this.baseSpeed = 0; // stop moving
        this.angleSpeed = 0; // stop swaying
        this.rotationSpeed = 0; // stop spinning
        this.alpha -= 0.005; // slowly fade out
        if (this.alpha <= 0) {
          this.reset(canvasWidth, canvasHeight, false);
        }
      }
      ```
  </action>
  <acceptance_criteria>
    - `lib/canvas/ParticleEngine.js` has updated `particleCount` logic (e.g. `40` and `70`).
    - `lib/canvas/Particle.js` contains logic that adds to `this.y` (gravity).
    - `lib/canvas/Particle.js` contains logic that halts movement and decreases `this.alpha` when `this.y > canvasHeight - 100`.
  </acceptance_criteria>
</task>
