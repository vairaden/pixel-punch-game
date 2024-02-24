import { config } from '../config';
import { GameObject } from './GameObject';
import { Sprite } from './Sprite';

export class Hero extends GameObject {
  // public radius: number;
  public dx: number;
  public dy: number;
  public health: number;
  public width: number;
  public height: number;

  private sprite: Sprite;
  private legsSprite: Sprite;
  private speed: number;
  private color: string;
  private damage: number;
  private invincible: boolean; // неуязвимость героя
  private zielX: number;
  private zielY: number;
  constructor(
    x: number,
    y: number,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    sprite: Sprite,
    legsSprite: Sprite
  ) {
    super(x, y, ctx, canvas);
    this.sprite = sprite;
    this.legsSprite = legsSprite;

    this.width = 50;
    this.height = 50;
    // this.radius = config.HERO.radius;
    this.speed = config.HERO.speed;
    this.dx = 0;
    this.dy = 0;
    this.health = config.HERO.health;
    this.color = 'green';
    this.damage = config.HERO.damage;
    this.invincible = false;
    this.zielX = 0;
    this.zielY = 0;
  }

  public moveUp(): void {
    this.dy = -this.speed;
  }

  public moveDown(): void {
    this.dy = this.speed;
  }

  public moveLeft(): void {
    this.dx = -this.speed;
  }

  public moveRight(): void {
    this.dx = this.speed;
  }

  // Методы для остановки движения героя
  public stopX(): void {
    this.dx = 0;
  }

  public stopY(): void {
    this.dy = 0;
  }

  public stop(): void {
    this.stopX();
    this.stopY();
  }

  public getDamage() {
    return this.damage;
  }

  public recieveDamage(damage: number) {
    if (!this.invincible) {
      this.health -= damage;
    }
    this.invincible = true;

    // Отталкивание героя в противоположную сторону при зедавании противником
    if (this.dx || this.dy) {
      this.x += -this.dx * 7;
      this.y += -this.dy * 7;
    } else {
      // Если герой стоит на месте и на его задевает противник, его оттолкнет от врага
      const getMinus = () => {
        const i = Math.random();
        return i < 0.5 ? -1 : 1;
      };
      this.x += Math.random() * 30 * getMinus();
      this.y += Math.random() * 30 * getMinus();
    }

    this.stop();

    const intervalRed = setInterval(() => {
      this.color = 'red';
    }, 50);

    const intervalGreen = setInterval(() => {
      this.color = 'green';
    }, 75);

    setTimeout(() => {
      clearInterval(intervalRed);
      clearInterval(intervalGreen);
      this.color = 'green';
      this.invincible = false;
    }, 500);
  }

  public updateZiel(x: number, y: number): void {
    this.zielX = x;
    this.zielY = y;
  }

  public update(): void {
    this.x += this.dx;
    this.y += this.dy;
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.x + this.width > this.canvas.width) {
      this.x = this.canvas.width - this.width;
    }
    if (this.y < 0) {
      this.y = 0;
    }
    if (this.y + this.height > this.canvas.height) {
      this.y = this.canvas.height - this.height;
    }
  }

  public draw(): void {
    this.sprite.update();
    // Определяем угол между героем и указателем мыши
    const angle = Math.atan2(this.zielY - this.y, this.zielX - this.x);

    // Преобразуем радианы в градусы и прибавляем 90 градусов, чтобы спрайт смотрел в нужном направлении
    const rotation = angle * (180 / Math.PI);

    // Вызываем отрисовку спрайта, передавая координаты, ширину, высоту и угол поворота
    this.sprite.update();
    // this.ctx.beginPath();
    // this.ctx.rect(this.x, this.y, this.width, this.height)
    // // this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    // this.ctx.fillStyle = this.color;
    // this.ctx.fill();
    // this.ctx.closePath();
    if (this.dx !== 0 || this.dy !== 0) {
      this.legsSprite.update();
      this.legsSprite.draw(
        this.x,
        this.y,
        0,
        this.width,
        this.height,
        rotation
      );
    }
    this.sprite.draw(this.x, this.y, 124, this.width, this.height, rotation);
    // this.sprite.draw(this.x, this.y, this.width, this.width)
  }
}
