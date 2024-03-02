import { GameObject } from './GameObject';
import { Coordinate } from '../lib/types';

export class Shop extends GameObject {
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

  public draw(): void {
    this.ctx.beginPath();
    this.ctx.fillStyle = 'black';
    this.ctx.rect(20, 20, 150, 100);
    this.ctx.stroke();
  }
}
