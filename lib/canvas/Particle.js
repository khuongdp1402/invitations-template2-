export class Particle {
  constructor(canvasWidth, canvasHeight) {
    this.reset(canvasWidth, canvasHeight, true);
  }

  reset(canvasWidth, canvasHeight, isInit = false) {
    this.x = Math.random() * canvasWidth;
    // If it's the first initialization, spawn them randomly across the screen.
    // If it's a recycle (isInit = false), spawn them at the bottom.
    this.y = isInit ? Math.random() * canvasHeight : canvasHeight + 10;
    // Size between 2 and 6
    this.radius = Math.random() * 4 + 2;
    this.width = this.radius;
    this.height = this.radius * 2.5; // Elongated like a petal
    
    // Alpha between 0.3 and 0.9
    this.alpha = Math.random() * 0.6 + 0.3;
    
    // Base speed moving up (Y axis)
    this.baseSpeed = Math.random() * 1.5 + 0.5;
    
    // Sine wave parameters for X axis swinging
    this.angle = Math.random() * Math.PI * 2;
    this.angleSpeed = Math.random() * 0.02 + 0.01;
    this.amplitude = Math.random() * 1 + 0.5;
    
    // Petal rotation
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() - 0.5) * 0.05;
    
    // Color palette: Terracotta / Blush
    const colors = [
      [192, 108, 89],  // #C06C59 (Terracotta)
      [212, 140, 112], // #D48C70 (Light Terracotta)
      [250, 243, 240]  // Nude white/pink
    ];
    this.color = colors[Math.floor(Math.random() * colors.length)];
    
    // Death flag for transition effects
    this.isDead = false;
  }

  update(scrollVelocity, canvasWidth, canvasHeight) {
    // Move up
    this.y -= (this.baseSpeed + scrollVelocity);
    
    // Swing left and right
    this.angle += this.angleSpeed;
    this.x += Math.sin(this.angle) * this.amplitude;
    
    // Spin the petal
    this.rotation += this.rotationSpeed;

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
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.beginPath();
    ctx.ellipse(0, 0, this.width, this.height, 0, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${this.alpha})`;
    ctx.shadowBlur = 10;
    ctx.shadowColor = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, 0.4)`;
    ctx.fill();
    ctx.restore();
  }
}
