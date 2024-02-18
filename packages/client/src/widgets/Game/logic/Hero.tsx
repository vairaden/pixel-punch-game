import { config } from '../config';
import { GameObject } from './GameObject';

export class Hero extends GameObject {
  public radius: number;
  public dx: number;
  public dy: number;
  public health: number;

  private speed: number;
  private color: string;
  private damage: number;
  private invincible: boolean; // неуязвимость героя

  constructor(
    x: number,
    y: number,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  ) {
    super(x, y, ctx, canvas);
    this.radius = config.HERO.radius;
    this.speed = config.HERO.speed;
    this.dx = 0;
    this.dy = 0;
    this.health = config.HERO.health;
    this.color = 'green';
    this.damage = config.HERO.damage;
    this.invincible = false;
  }

  public moveUp(): void {
    this.dy = -this.speed;
  }

  public moveDown(): void {
    this.dy = this.speed;
  }

  public moveLeft(): void {
    this.dx = -this.speed;
  }

  public moveRight(): void {
    this.dx = this.speed;
  }

  // Методы для остановки движения героя
  public stopX(): void {
    this.dx = 0;
  }

  public stopY(): void {
    this.dy = 0;
  }

  public stop(): void {
    this.stopX();
    this.stopY();
  }

  public getDamage() {
    return this.damage;
  }

  public recieveDamage(damage: number) {
    if (!this.invincible) {
      this.health -= damage;
    }
    this.invincible = true;

    // Отталкивание героя в противоположную сторону при зедавании противником
    if (this.dx || this.dy) {
      this.x += -this.dx * 7;
      this.y += -this.dy * 7;
    } else {
      // Если герой стоит на месте и на его задевает противник, его оттолкнет от врага
      const getMinus = () => {
        const i = Math.random();
        return i < 0.5 ? -1 : 1;
      };
      this.x += Math.random() * 30 * getMinus();
      this.y += Math.random() * 30 * getMinus();
    }

    this.stop();

    const intervalRed = setInterval(() => {
      this.color = 'red';
    }, 50);

    const intervalGreen = setInterval(() => {
      this.color = 'green';
    }, 75);

    setTimeout(() => {
      clearInterval(intervalRed);
      clearInterval(intervalGreen);
      this.color = 'green';
      this.invincible = false;
    }, 500);
  }

  public update(): void {
    this.x += this.dx;
    this.y += this.dy;
    if (this.x - this.radius < 0) {
      this.x = this.radius;
    }
    if (this.x + this.radius > this.canvas.width) {
      this.x = this.canvas.width - this.radius;
    }
    if (this.y - this.radius < 0) {
      this.y = this.radius;
    }
    if (this.y + this.radius > this.canvas.height) {
      this.y = this.canvas.height - this.radius;
    }
  }

  public draw(): void {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();
  }
}
