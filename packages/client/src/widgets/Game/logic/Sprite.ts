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
  private width: number;
  private height: number;

  private frameIndex: number;
  private tickCount: number;
  // private ticksPerFrame: number;
  // private numberOfFrames: number;
  private animation: animation;
  private frameIndexDirection: string;

  constructor(
    ctx: CanvasRenderingContext2D,
    image: HTMLImageElement,
    // ticksPerFrame: number,
    // numberOfFrames: number,
    width: number,
    height: number,
    animation?: animation
  ) {
    this.ctx = ctx;

    this.image = image; // Изображение со спрайтами

    this.frameIndex = 0;
    this.tickCount = 0;
    // this.ticksPerFrame = ticksPerFrame || 0;
    // this.numberOfFrames = numberOfFrames || 1;

    this.width = width;
    this.height = height;
    this.animation = animation;
    this.frameIndexDirection = 'forward';
    // this.start();
  }

  update() {
    if (this.animation?.isAnimated) {
      this.tickCount++;
      // let frameIndexDirection = 'forward'
      if (this.tickCount > this.animation.ticksPerFrame) {
        this.tickCount = 0;

        // Определение направления изменения frameIndex
        if (this.frameIndexDirection === 'forward') {
          // Увеличение frameIndex
          if (this.frameIndex < this.animation.numberOfFrames - 1) {
            this.frameIndex++;
          } else {
            // Если достигнут конец последовательности, изменяем направление на обратное
            this.frameIndexDirection = 'backward';
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
    x: number,
    y: number,
    imgY: number,
    width: number,
    height: number,
    rotation?: number
  ) {
    if (rotation) {
      this.ctx.save();
      this.ctx.translate(x + width / 2, y + height / 2);
      this.ctx.rotate((rotation * Math.PI) / 180);
      this.ctx.drawImage(
        this.image,
        this.width * this.frameIndex,
        imgY,
        this.width,
        this.height,
        -width / 2,
        -height / 2,
        width,
        height
      );
      this.ctx.restore();
    } else {
      this.ctx.drawImage(
        this.image,
        0,
        imgY,
        this.width,
        this.height,
        x,
        y,
        width,
        height
      );
    }
  }
}
