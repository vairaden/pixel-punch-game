import { config } from '../config';
import { GameObject } from './GameObject';

export class Enemy extends GameObject {
  private speed: number;
  private dx: number;
  private dy: number;
  public radius: number;
  public health: number;
  public attackInterval: number; // ms
  public damage: number;

  constructor(
    x: number,
    y: number,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  ) {
    super(x, y, ctx, canvas);
    this.radius = 20;
    this.dx = 0;
    this.dy = 0;
    this.speed = config.ENEMY.speed;
    this.health = config.ENEMY.health;
    this.attackInterval = config.ENEMY.attackInterval;
    this.damage = config.ENEMY.damage;
  }

  public move() {
    const directionX = this.x - this.canvas.width / 2;
    const directionY = this.y - this.canvas.height / 2;

    const length = Math.sqrt(directionX * directionX + directionY * directionY);
    const normalizedDirectionX = directionX / length;
    const normalizedDirectionY = directionY / length;

    this.dx = -normalizedDirectionX * this.speed;
    this.dy = -normalizedDirectionY * this.speed;
  }

  public stop() {
    this.dx = 0;
    this.dy = 0;
  }

  public recieveDamage(damage: number) {
    this.health -= damage;
  }

  public getDamage() {
    return this.damage;
  }

  public getAttackSpeed() {
    return this.attackInterval;
  }

  public update(): void {
    this.x += this.dx;
    this.y += this.dy;
  }

  public draw(): void {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.fillStyle = 'red';
    this.ctx.fill();
    this.ctx.closePath();
  }
}
