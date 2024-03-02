import { GameObject } from './GameObject';

export class Button extends GameObject {
  private dx: number;
  private dy: number;

  public height: number;
  public width: number;

  constructor(
    x: number,
    y: number,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  ) {
    super(x, y, ctx, canvas);
    this.height = 100;
    this.width = 100;
    this.dx = 0;
    this.dy = 0;
  }

  public update() {
    this.x += this.dx;
    this.y += this.dy;
  }

  public draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = 'black';
    this.ctx.fill();
    this.ctx.closePath();
  }
}
