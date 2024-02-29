import { config, sprites } from '../config';
import { GameObject } from './GameObject';
import { Sprite } from './Sprite';

const { BASE } = config;
const { BASE_SPRITE } = sprites;

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
    this.initialHealth = BASE.health;
    this.health = BASE.health;
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
    this.sprite.draw({
      x: this.x,
      y: this.y,
      imgWidth: BASE_SPRITE.size.width,
      imgHeight: BASE_SPRITE.size.height,
      imgY: BASE_SPRITE.size.offsetY,
      drawWidth: this.width,
      drawHeight: this.height,
    });
    this.drawHealth();
  }
}
