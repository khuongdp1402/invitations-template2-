import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Particle } from './Particle';

gsap.registerPlugin(ScrollTrigger);

export class ParticleEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.scrollVelocity = 0;
    this.isActive = true;
    this.particleCount = window.innerWidth < 768 ? 40 : 100; // ENGI-05 base logic

    this.init();
    this.bindEvents();
    this.start();
  }

  init() {
    this.resize();
    this.createParticles();
  }

  resize = () => {
    const dpr = window.devicePixelRatio || 1;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    
    // Scale for Retina displays
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    
    this.ctx.scale(dpr, dpr);
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push(new Particle(this.width, this.height));
    }
  }

  bindEvents() {
    window.addEventListener('resize', this.resize);

    this.scrollTrigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        // Get scroll velocity. 
        // GSAP velocity can be quite high, so we scale it down.
        // We only want downward scrolls (positive velocity) to push particles up faster,
        // and upward scrolls (negative velocity) to push particles down.
        // Or we can just use the absolute value if we want any scroll to stir up the dust.
        // Let's use the actual velocity scaled down.
        let v = self.getVelocity() / 300;
        
        // Clamp the velocity to avoid extreme jumps
        this.scrollVelocity = Math.max(-2, Math.min(v, 5));
      }
    });
  }

  render = () => {
    if (!this.isActive) return;

    // Decay scroll velocity back to 0 smoothly
    this.scrollVelocity *= 0.9;

    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.update(this.scrollVelocity, this.width, this.height);
      p.draw(this.ctx);
    }
  }

  start() {
    gsap.ticker.add(this.render);
  }

  destroy() {
    this.isActive = false;
    window.removeEventListener('resize', this.resize);
    gsap.ticker.remove(this.render);
    if (this.scrollTrigger) {
      this.scrollTrigger.kill();
    }
  }
}
