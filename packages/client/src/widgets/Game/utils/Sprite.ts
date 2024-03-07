type TAnimation = {
  isAnimated: boolean;
  ticksPerFrame: number;
  numberOfFrames: number;
  reverseAnimation?: boolean;
};

type TDrawParams = {
  x: number; // координаты для отрисовки на canvas
  y: number;
  imgWidth: number; // ширина изображения для отрисовки
  imgHeight: number; // его высота
  imgY: number; // отступ до нужной части спрайта по оси Y
  drawWidth: number; // ширина отрисовки на canvas
  drawHeight: number; // его высота
  rotation?: number; // угол поворота изображения
};

export class Sprite {
  private ctx: CanvasRenderingContext2D;
  private image: HTMLImageElement;

  private frameIndex: number;
  private tickCount: number;
  private animation: TAnimation | undefined;
  private frameIndexDirection: string;

  constructor(ctx: CanvasRenderingContext2D, image: HTMLImageElement) {
    this.ctx = ctx;

    this.image = image; // Изображение со спрайтами

    this.frameIndex = 0;
    this.tickCount = 0;

    this.frameIndexDirection = 'forward';
  }

  setAnimationParams(params: TAnimation) {
    this.animation = params;
  }

  update() {
    if (!this.animation?.isAnimated) return;

    this.tickCount++;

    if (this.tickCount <= this.animation.ticksPerFrame) return;

    this.tickCount = 0;

    if (this.frameIndexDirection === 'forward') {
      if (this.frameIndex < this.animation.numberOfFrames - 1) {
        this.frameIndex++;
      } else if (this.animation.reverseAnimation) {
        this.frameIndexDirection = 'backward';
      } else {
        this.frameIndex = 0;
      }
    } else {
      if (this.frameIndex > 0) {
        this.frameIndex--;
      } else {
        this.frameIndexDirection = 'forward';
      }
    }
  }

  draw({
    x,
    y,
    imgWidth,
    imgHeight,
    imgY,
    drawWidth,
    drawHeight,
    rotation,
  }: TDrawParams) {
    if (rotation) {
      this.ctx.save();
      this.ctx.translate(x + drawWidth / 2, y + drawHeight / 2);
      this.ctx.rotate((rotation * Math.PI) / 180);
      this.ctx.drawImage(
        this.image,
        imgWidth * this.frameIndex,
        imgY,
        imgWidth,
        imgHeight,
        -drawWidth / 2,
        -drawHeight / 2,
        drawWidth,
        drawHeight
      );
      this.ctx.restore();
    } else {
      this.ctx.drawImage(
        this.image,
        0,
        imgY,
        imgWidth,
        imgHeight,
        x,
        y,
        drawWidth,
        drawHeight
      );
    }
  }
}
