---
version: "1.0.0"
approved: false
---

# Phase 05: TỐI ƯU HÓA TRẢI NGHIỆM DI ĐỘNG & HIỆU NĂNG

**Goal:** Áp dụng tối ưu tài nguyên (hình ảnh, responsive canvas) để đáp ứng Webview Zalo/FB.

## Workflow

### Wave 1: Particle Engine Dynamic Resize & Image Optimization

<task>
  <id>05-01</id>
  <title>Dynamic Particle Count on Resize</title>
  <type>execute</type>
  <read_first>
    - lib/canvas/ParticleEngine.js
  </read_first>
  <action>
    Modify `resize` method in `lib/canvas/ParticleEngine.js`:
    1. Check `window.innerWidth` during resize.
    2. Set `targetParticleCount = window.innerWidth < 768 ? 40 : 100`.
    3. If `this.particleCount` does not equal `targetParticleCount`:
       - Update `this.particleCount = targetParticleCount`.
       - Re-invoke `this.createParticles()` to recreate the particle array with the new size.
  </action>
  <acceptance_criteria>
    - `lib/canvas/ParticleEngine.js` contains logic to adjust `particleCount` dynamically within `resize` method.
    - Particles correctly spawn or despawn to meet the 40/100 threshold when crossing 768px.
  </acceptance_criteria>
</task>

<task>
  <id>05-02</id>
  <title>Optimize Image Loading on HeroSection and Gallery3D</title>
  <type>execute</type>
  <read_first>
    - components/sections/HeroSection.jsx
    - components/canvas/Gallery3D.jsx
  </read_first>
  <action>
    Modify Unsplash placeholder URLs and Image attributes:
    1. In `HeroSection.jsx`: The hero image is currently `priority`. Keep it `priority`, but ensure it serves an optimized Unsplash URL based on expected max width (`&w=1920`).
    2. In `Gallery3D.jsx`: Iterate over placeholder images. Update the URLs to request lower resolution since these are small gallery cards (e.g. change `&w=1080` to `&w=600`).
    3. Ensure `Image` in `Gallery3D.jsx` uses `loading="lazy"` and `fetchPriority="low"` if they are not in the initial viewport. Since it's in a 3D Canvas, `<Image>` from `next/image` might not be used directly in `@react-three/drei` (we use `Image` from `@react-three/drei`). We should ensure the `url` string passed to Drei's `Image` has `&w=600&q=70` to fetch small sizes.
  </action>
  <acceptance_criteria>
    - `components/canvas/Gallery3D.jsx` uses `&w=600` for its Unsplash placeholders.
    - `components/sections/HeroSection.jsx` is visually verified to have `priority` (it already does).
  </acceptance_criteria>
</task>

## Verification
- Run `npm run dev` and resize window across 768px to ensure particle array resizes.
- Check network tab to ensure gallery images load at ~600px width.
- Run `npm run build` to verify no compilation errors.

## Requirements Coverage
- `ENGI-05`: Mobile particle count reduction is implemented dynamically.
- `ENGI-06`: Pointer-events logic is already implemented.
- `UISS-07`: Image sizes optimized via smaller fetch requests.
