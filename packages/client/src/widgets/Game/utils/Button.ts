import { GameObject } from './GameObject';

export interface ButtonParams {
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
}

interface ConstructorParams extends ButtonParams {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
}

export class Button extends GameObject {
  public height: number;
  public width: number;
  public x: number;
  public y: number;
  private text: string;

  constructor({ x, y, width, height, text, canvas, ctx }: ConstructorParams) {
    super(x, y, ctx, canvas);
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this.text = text;
  }

  public draw() {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.ctx.fillStyle = 'white';
    this.ctx.fillText(this.text, this.x, this.y + 20);
  }
}
