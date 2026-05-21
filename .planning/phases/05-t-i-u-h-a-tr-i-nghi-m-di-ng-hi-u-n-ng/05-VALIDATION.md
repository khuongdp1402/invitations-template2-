# Phase 05: Validation Strategy

## Nyquist Dimensions

1. **Happy Path**: Verify particles reduce to 40 on screens < 768px.
2. **Edge Cases**: Verify resizing from desktop to mobile adjusts particle count dynamically.
3. **Boundaries**: N/A
4. **State**: Particle engine state is correctly managed during resize.
5. **Security/Auth**: N/A
6. **Performance**: Images load without blocking render. Canvas achieves 60fps on mobile.
7. **Accessibility**: Canvas has `aria-hidden="true"`.
8. **Dependencies**: N/A
