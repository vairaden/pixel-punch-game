import { config } from '../config';
import { GameObject } from './GameObject';

export class Base extends GameObject {
  public width: number;
  public height: number;
  public health: number;
  private initialHealth: number;

  constructor(
    x: number,
    y: number,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) {
    super(x, y, ctx, canvas);
    this.width = width;
    this.height = height;
    this.initialHealth = config.BASE.health;
    this.health = config.BASE.health;
  }

  public receiveDamage(damage: number) {
    this.health -= damage;
  }

  private drawHealth() {
    this.ctx.font = '16px Arial';
    this.ctx.fillStyle = '#0095DD';
    this.ctx.fillText(
      `${this.health} / ${this.initialHealth}`,
      this.x,
      this.y - 5
    );
  }

  public draw(): void {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.width, this.height);
    this.ctx.fillStyle = 'blue';
    this.ctx.fill();
    this.ctx.closePath();
    this.drawHealth();
  }
}
