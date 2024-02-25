import { config, sprites } from '../config';
import { GameObject } from './GameObject';
import { Sprite } from './Sprite';

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
    this.height = config.ENEMY.height;
    this.width = config.ENEMY.width;
    this.dx = 0;
    this.dy = 0;
    this.speed = config.ENEMY.speed;
    this.health = config.ENEMY.health;
    this.attackInterval = config.ENEMY.attackInterval;
    this.damage = config.ENEMY.damage;
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

    // Преобразуем радианы в градусы и прибавляем 90 градусов, чтобы спрайт смотрел в нужном направлении
    const rotation = angle * (180 / Math.PI);

    if (this.dx !== 0 || this.dy !== 0) {
      this.sprite.setAnimationParams(
        sprites.ENEMY_SPRITE.movingParams.animation
      );

      this.sprite.draw(
        this.x,
        this.y,
        sprites.ENEMY_SPRITE.movingParams.width,
        sprites.ENEMY_SPRITE.movingParams.height,
        sprites.ENEMY_SPRITE.movingParams.offsetY,
        this.width,
        this.height,
        rotation
      );
    } else {
      this.sprite.setAnimationParams(
        sprites.ENEMY_SPRITE.attackParams.animation
      );

      this.sprite.draw(
        this.x,
        this.y,
        sprites.ENEMY_SPRITE.attackParams.width,
        sprites.ENEMY_SPRITE.attackParams.height,
        sprites.ENEMY_SPRITE.attackParams.offsetY,
        this.width,
        this.height,
        rotation
      );
    }
  }
}
