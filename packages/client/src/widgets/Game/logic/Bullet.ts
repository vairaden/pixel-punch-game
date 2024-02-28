import { GameObject } from './GameObject';
import { Coordinate } from '../lib/types';

export class Bullet extends GameObject {
  public radius: number;
  private speed: number;
  private dx: number;
  private dy: number;

  constructor(
    x: number,
    y: number,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  ) {
    super(x, y, ctx, canvas);
    this.radius = 3;
    this.dx = 0;
    this.dy = 0;
    this.speed = 80;
  }

  public update(): void {
    this.x += this.dx;
    this.y += this.dy;
  }

  public shoot(start: Coordinate, end: Coordinate): void {
    const directionX = end.x - start.x;
    const directionY = end.y - start.y;

    const length = Math.sqrt(directionX * directionX + directionY * directionY);
    const normalizedDirectionX = directionX / length;
    const normalizedDirectionY = directionY / length;

    this.x = start.x;
    this.y = start.y;
    this.dx = normalizedDirectionX * this.speed;
    this.dy = normalizedDirectionY * this.speed;
  }

  public draw(): void {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = 'black';
    this.ctx.fill();
    this.ctx.closePath();
  }
}
