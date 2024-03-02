import {
  Hero,
  Base,
  Ziel,
  Bullet,
  Enemy,
  Sprite,
  ResourceManager,
  GameObject,
} from './index';
import { config, sprites } from '../config';
import { isCollision } from '../lib/isCollision';
import { GameOverCallback, IGameItem } from '@/shared/types';
import { Coin } from '@/widgets/Game/logic/Coin';

const enum ResourceNames {
  HeroImage = 'hero',
  BaseImage = 'base',
  EnemyImage = 'enemy',
  BackgroundImage = 'background',
  CoinImage = 'coin',
}

const enum GameStates {
  Playing = 'playing',
  Pause = 'pause',
  ShopOpen = 'shopOpen',
}

export class GameEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private clickCallbacks: Array<(e: MouseEvent, gameState: GameStates) => void>;
  private hero: Hero;
  private base: Base;
  private ziel: Ziel;
  private bullets: Bullet[];
  private enemies: Enemy[];
  private items: IGameItem[];

  private gameState: GameStates;

  // Коллекция для хранения интервалов атаки для противников
  private activeAttackIntervals: Set<number> = new Set<number>();
  private resourceManager: ResourceManager;

  private gameOverCallback: GameOverCallback;

  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    gameOverCallback: GameOverCallback
  ) {
    this.gameOverCallback = gameOverCallback;

    this.canvas = canvas;
    this.ctx = ctx;
    this.clickCallbacks = [];

    this.gameState = GameStates.Playing;

    this.resourceManager = new ResourceManager();
    this.loadResources();

    const heroSprite = new Sprite(
      this.ctx,
      this.resourceManager.get(ResourceNames.HeroImage)
    );

    this.hero = new Hero(
      this.canvas.width / 2 - config.HERO.startX,
      this.canvas.height / 2 - config.HERO.startY,
      this.canvas,
      this.ctx,
      heroSprite
    );

    const baseSprite = new Sprite(
      this.ctx,
      this.resourceManager.get(ResourceNames.BaseImage)
    );

    this.base = new Base(
      (this.canvas.width - config.BASE.width) / 2,
      (this.canvas.height - config.BASE.height) / 2,
      this.canvas,
      this.ctx,
      config.BASE.width,
      config.BASE.height,
      baseSprite
    );

    this.ziel = new Ziel(0, 0, canvas, ctx);
    this.bullets = [];
    this.enemies = [];
    this.items = [];

    this.init();
  }

  private loadResources(): void {
    this.resourceManager.load([
      { name: ResourceNames.HeroImage, url: sprites.HERO_SPRITE.url },
      { name: ResourceNames.BaseImage, url: sprites.BASE_SPRITE.url },
      { name: ResourceNames.EnemyImage, url: sprites.ENEMY_SPRITE.url },
      {
        name: ResourceNames.BackgroundImage,
        url: sprites.BACKGROUND_SPRITE.url,
      },
      { name: ResourceNames.CoinImage, url: sprites.COIN_SPRITE.url },
    ]);
  }

  private init(): void {
    // Создание врагов и других игровых объектов
    let i = 0;
    setInterval(() => {
      let x = Math.random() * this.canvas.width;
      let y = Math.random() * this.canvas.height;
      // Распределение врагов равномерно со всех краев поля
      if (i % 4 === 0) {
        y = -30;
      } else if (i % 3 === 0) {
        x = -30;
      } else if (i % 2 === 0) {
        x = this.canvas.width + 30;
      } else {
        y = this.canvas.height + 30;
      }
      const enemySprite = new Sprite(
        this.ctx,
        this.resourceManager.get(ResourceNames.EnemyImage)
      );
      const enemy = new Enemy(x, y, this.canvas, this.ctx, enemySprite);
      this.enemies.push(enemy);
      i++;
      // TODO изменить хардкод интервал на функцию, которая будет уменьшать время
    }, 1000);

    // Обработка пользовательского ввода
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      switch (e.key) {
        case 'w':
        case 'ц':
          this.hero.moveUp();
          break;
        case 'a':
        case 'ф':
          this.hero.moveLeft();
          break;
        case 's':
        case 'ы':
          this.hero.moveDown();
          break;
        case 'd':
        case 'в':
          this.hero.moveRight();
          break;
      }
    });

    document.addEventListener('keyup', (e: KeyboardEvent) => {
      switch (e.key) {
        case 'w':
        case 'ц':
        case 'ы':
        case 's':
          this.hero.stopY();
          break;
        case 'a':
        case 'ф':
        case 'в':
        case 'd':
          this.hero.stopX();
          break;
      }
    });

    document.addEventListener('mousemove', (e: MouseEvent) => {
      const relativeX = e.clientX - this.canvas.offsetLeft;
      const relativeY = e.clientY - this.canvas.offsetTop;
      this.ziel.updateCoordinates(relativeX, relativeY);
      this.hero.updateZiel(relativeX, relativeY);
    });

    document.addEventListener('mousedown', (e: MouseEvent) => {
      this.clickCallbacks.forEach(cb => cb(e, this.gameState));
    });

    this.clickCallbacks.push((e, gameState) => {
      if (gameState !== GameStates.Playing) {
        return;
      }

      const relativeX = e.clientX - this.canvas.offsetLeft;
      const relativeY = e.clientY - this.canvas.offsetTop;
      const startX = this.hero.x + this.hero.width / 2;
      const startY = this.hero.y + this.hero.height / 2;

      const bullet = new Bullet(0, 0, this.canvas, this.ctx);
      bullet.shoot({ x: startX, y: startY }, { x: relativeX, y: relativeY });
      this.bullets.push(bullet);
    });

    this.placeCoin(
      Math.random() * this.canvas.width,
      Math.random() * this.canvas.height
    );
  }

  private startEnemyAttackInterval(enemy: Enemy, index: number) {
    // Проверяем, активен ли уже интервал атаки для данного врага
    if (!this.activeAttackIntervals.has(index)) {
      const intervalId = setInterval(() => {
        const damage = enemy.getDamage(); // Получаем урон от врага
        this.base.receiveDamage(damage); // Передаем урон базе
      }, enemy.attackInterval);

      // Добавляем идентификатор интервала в множество активных интервалов
      this.activeAttackIntervals.add(index);

      // После завершения интервала удаляем его идентификатор из множества активных интервалов
      setTimeout(() => {
        clearInterval(intervalId);
        this.activeAttackIntervals.delete(index);
      }, enemy.attackInterval);
    }
  }

  public placeCoin(x: number, y: number) {
    const sprite = new Sprite(
      this.ctx,
      this.resourceManager.get(ResourceNames.CoinImage)
    );

    const coin = new Coin(x, y, this.canvas, this.ctx, sprite);
    this.items.push(coin);
  }

  private drawStats() {
    this.ctx.font = '16px Arial';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText(`Много деняк`, 20, 20);
  }

  // Обновление состояние объектов
  public update(): void {
    if (this.hero.health <= 0 || this.base.health <= 0) {
      this.gameOverCallback({ score: 100 });
    }
    this.hero.update();

    this.bullets.forEach((bullet, bulletIndex) => {
      bullet.update();

      // Проверка попадания снаряда в противника
      this.enemies.forEach((enemy, enemyIndex) => {
        if (isCollision(bullet, enemy)) {
          this.bullets.splice(bulletIndex, 1); // Удаляем снаряд

          const damage = this.hero.getDamage();
          enemy.recieveDamage(damage);

          if (enemy.health <= 0) {
            this.enemies.splice(enemyIndex, 1); // Удаляем врага
          }
        }
      });
    });

    this.enemies.forEach((enemy, index) => {
      if (isCollision(this.hero, enemy)) {
        const damage = enemy.getDamage();
        this.hero.recieveDamage(damage);
      }

      if (isCollision(this.base, enemy)) {
        this.startEnemyAttackInterval(enemy, index);
      }

      enemy.update();
    });

    if (isCollision(this.hero, this.base)) {
      this.hero.stop();
    }
  }

  private drawBackground() {
    const pattern = this.ctx.createPattern(
      this.resourceManager.get(ResourceNames.BackgroundImage),
      'repeat'
    );
    if (pattern) {
      this.ctx.fillStyle = pattern;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  public draw(): void {
    // Очистка canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawBackground();
    this.drawStats();

    // Отрисовка сущностей
    this.hero.draw();
    this.ziel.draw();

    // Отрисовка снарядов и врагов
    this.bullets.forEach((bullet, bulletIndex) => {
      // Удаление снарядов, которые вылетели за пределы поля
      if (
        bullet.x > this.canvas.width ||
        bullet.x < 0 ||
        bullet.y > this.canvas.height ||
        bullet.y < 0
      ) {
        this.bullets.splice(bulletIndex, 1);
      }
      bullet.draw();
    });

    this.enemies.forEach(enemy => {
      enemy.draw();
      if (!isCollision(this.hero, enemy) && !isCollision(this.base, enemy)) {
        enemy.move();
      } else {
        enemy.stop();
      }
    });

    this.items.forEach(item => {
      item.draw();
    });

    this.base.draw();
  }
}
