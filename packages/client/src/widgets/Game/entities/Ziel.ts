import { GameObject } from '@/widgets/Game/utils/GameObject';

export class Ziel extends GameObject {
  private radius: number;
  constructor(
    x: number,
    y: number,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  ) {
    super(x, y, ctx, canvas);
    this.radius = 3;
  }

  public updateCoordinates(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  public draw(): void {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = 'black';
    this.ctx.fill();
    this.ctx.closePath();
  }
}
