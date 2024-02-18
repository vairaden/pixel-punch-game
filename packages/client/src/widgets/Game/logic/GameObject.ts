export abstract class GameObject {
  public x: number;
  public y: number;
  protected ctx: CanvasRenderingContext2D;
  protected canvas: HTMLCanvasElement;

  constructor(
    x: number,
    y: number,
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement
  ) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.canvas = canvas;
  }

  public update(): void {
    // Логика обновления объекта
  }

  public draw(): void {
    // Логика отрисовки объекта
  }
}
