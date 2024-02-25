import { config, sprites } from '../config';
import { GameObject } from './GameObject';
import { Sprite } from './Sprite';

export class Base extends GameObject {
  public width: number;
  public height: number;
  public health: number;
  private initialHealth: number;
  private sprite: Sprite;

  constructor(
    x: number,
    y: number,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    sprite: Sprite
  ) {
    super(x, y, ctx, canvas);
    this.width = width;
    this.height = height;
    this.initialHealth = config.BASE.health;
    this.health = config.BASE.health;
    this.sprite = sprite;
  }

  public receiveDamage(damage: number) {
    this.health -= damage;
  }

  private drawHealth() {
    this.ctx.font = '16px Arial';
    this.ctx.fillStyle = 'red';
    this.ctx.fillText(
      `${this.health} / ${this.initialHealth}`,
      this.x,
      this.y - 5
    );
  }

  public draw(): void {
    this.sprite.draw(
      this.x,
      this.y,
      sprites.BASE_SPRITE.size.width,
      sprites.BASE_SPRITE.size.height,
      sprites.BASE_SPRITE.size.offsetY,
      this.width,
      this.height
    );
    this.drawHealth();
  }
}
