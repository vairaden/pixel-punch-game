type animation =
  | {
      isAnimated: boolean;
      ticksPerFrame: number;
      numberOfFrames: number;
      reverseAnimation?: boolean;
    }
  | undefined;

export class Sprite {
  private ctx: CanvasRenderingContext2D;
  private image: HTMLImageElement;

  private frameIndex: number;
  private tickCount: number;
  private animation: animation;
  private frameIndexDirection: string;

  constructor(ctx: CanvasRenderingContext2D, image: HTMLImageElement) {
    this.ctx = ctx;

    this.image = image; // Изображение со спрайтами

    this.frameIndex = 0;
    this.tickCount = 0;

    this.frameIndexDirection = 'forward';
  }

  setAnimationParams(params: animation) {
    this.animation = params;
  }

  update() {
    if (this.animation?.isAnimated) {
      this.tickCount++;

      if (this.tickCount > this.animation.ticksPerFrame) {
        this.tickCount = 0;

        // Определение направления изменения кадров
        if (this.frameIndexDirection === 'forward') {
          if (this.frameIndex < this.animation.numberOfFrames - 1) {
            this.frameIndex++;
          } else {
            // Если достигнут конец последовательности, изменяем направление на обратное, либо начинаем заново
            if (this.animation.reverseAnimation) {
              this.frameIndexDirection = 'backward';
            } else {
              this.frameIndex = 0;
              return;
            }
          }
        } else {
          // Уменьшение frameIndex
          if (this.frameIndex > 0) {
            this.frameIndex--;
          } else {
            // Если достигнуто начало последовательности, изменяем направление на прямое
            this.frameIndexDirection = 'forward';
          }
        }
      }
    }
  }

  draw(
    x: number, // координаты для отрисовки на canvas
    y: number,
    imgWidth: number, // ширина изображения для отрисовки
    imgHeight: number, // его высота
    imgY: number, // отступ до нужной части спрайта по оси Y
    drawWidth: number, // ширина отрисовки на canvas
    drawHeight: number, // его высота
    rotation?: number // угол поворота изображения
  ) {
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
