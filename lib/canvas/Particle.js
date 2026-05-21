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

    // Recycle: if it goes above the screen, reset it to the bottom
    if (this.y < -10) {
      this.reset(canvasWidth, canvasHeight, false);
    }
    // Also recycle if it goes way below the screen (e.g. user scrolling up very fast)
    if (this.y > canvasHeight + 100) {
      this.y = -10;
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 250, 240, ${this.alpha})`;
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
    ctx.fill();
    ctx.restore();
  }
}
