export class Particle {
  constructor(canvasWidth, canvasHeight) {
    this.reset(canvasWidth, canvasHeight, true);
  }

  reset(canvasWidth, canvasHeight, isInit = false) {
    this.x = Math.random() * canvasWidth;
    // If it's the first initialization, spawn them randomly across the screen.
    // If it's a recycle (isInit = false), spawn them at the bottom.
    this.y = isInit ? Math.random() * canvasHeight : canvasHeight + 10;
    
    // Size between 1 and 3
    this.radius = Math.random() * 2 + 1;
    
    // Alpha between 0.2 and 0.8
    this.alpha = Math.random() * 0.6 + 0.2;
    
    // Base speed moving up (Y axis)
    this.baseSpeed = Math.random() * 1 + 0.5;
    
    // Sine wave parameters for X axis swinging
    this.angle = Math.random() * Math.PI * 2;
    this.angleSpeed = Math.random() * 0.02 + 0.01;
    this.amplitude = Math.random() * 0.5 + 0.2;
    
    // Death flag for transition effects
    this.isDead = false;
  }

  update(scrollVelocity, canvasWidth, canvasHeight) {
    // Move up
    this.y -= (this.baseSpeed + scrollVelocity);
    
    // Swing left and right
    this.angle += this.angleSpeed;
    this.x += Math.sin(this.angle) * this.amplitude;

    // Wrap around horizontally if they drift off screen
    if (this.x < -10) this.x = canvasWidth + 10;
    if (this.x > canvasWidth + 10) this.x = -10;

    // Recycle: if it goes above the screen
    if (this.y < -10) {
      if (this.isDead) return false; // Destroy this particle
      this.reset(canvasWidth, canvasHeight, false);
    }
    // Also recycle if it goes way below the screen (e.g. user scrolling up very fast)
    if (this.y > canvasHeight + 100) {
      if (this.isDead) return false; // Destroy this particle
      this.y = -10;
    }
    
    return true; // Keep this particle alive
  }

  draw(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(212, 175, 55, ${this.alpha})`; // #d4af37
    ctx.shadowBlur = 15;
    ctx.shadowColor = 'rgba(212, 175, 55, 0.6)';
    ctx.fill();
    ctx.restore();
  }
}
