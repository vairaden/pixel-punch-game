import { config, sprites } from '../config';
import { GameObject, Sprite } from '@/widgets/Game/utils';

const { ENEMY } = config;
const { ENEMY_SPRITE } = sprites;

export class Enemy extends GameObject {
  private speed: number;
  private dx: number;
  private dy: number;
  private sprite: Sprite;

  public height: number;
  public width: number;
  public health: number;
  public attackInterval: number; // ms
  public damage: number;

  constructor(
    x: number,
    y: number,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    sprite: Sprite
  ) {
    super(x, y, ctx, canvas);
    this.height = ENEMY.height;
    this.width = ENEMY.width;
    this.dx = 0;
    this.dy = 0;
    this.speed = ENEMY.speed;
    this.health = ENEMY.health;
    this.attackInterval = ENEMY.attackInterval;
    this.damage = ENEMY.damage;
    this.sprite = sprite;
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
    this.sprite.update();

    // Определяем угол между героем и указателем мыши
    const angle = Math.atan2(
      this.canvas.height / 2 - this.y,
      this.canvas.width / 2 - this.x
    );

    // Преобразуем радианы в градусы, чтобы спрайт смотрел в нужном направлении
    const rotation = angle * (180 / Math.PI);

    if (this.dx !== 0 || this.dy !== 0) {
      this.sprite.setAnimationParams(ENEMY_SPRITE.movingParams.animation);

      this.sprite.draw({
        x: this.x,
        y: this.y,
        imgWidth: ENEMY_SPRITE.movingParams.width,
        imgHeight: ENEMY_SPRITE.movingParams.height,
        imgY: ENEMY_SPRITE.movingParams.offsetY,
        drawWidth: this.width,
        drawHeight: this.height,
        rotation,
      });
    } else {
      this.sprite.setAnimationParams(ENEMY_SPRITE.attackParams.animation);

      this.sprite.draw({
        x: this.x,
        y: this.y,
        imgWidth: ENEMY_SPRITE.attackParams.width,
        imgHeight: ENEMY_SPRITE.attackParams.height,
        imgY: ENEMY_SPRITE.attackParams.offsetY,
        drawWidth: this.width,
        drawHeight: this.height,
        rotation,
      });
    }
  }
}
