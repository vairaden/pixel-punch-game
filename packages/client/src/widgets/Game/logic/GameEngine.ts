import { ResourceManager } from './index';
import { config, sprites } from '../config';
import { isCollision } from '../lib/isCollision';
import { GameOverCallback } from '@/shared/types';
import { Base, Bullet, Coin, Enemy, Hero, Ziel } from '@/widgets/Game/entities';
import { Button, ButtonParams, GameItem, Sprite } from '@/widgets/Game/utils';

const enum ResourceNames {
  HeroImage = 'hero',
  BaseImage = 'base',
  EnemyImage = 'enemy',
  BackgroundImage = 'background',
  CoinImage = 'coin',
}

const enum GameStates {
  Playing = 'playing',
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
  private items: GameItem[];
  private money: number;

  private gameState: GameStates;

  private buttons: Record<string, Button[]>;

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
    this.money = 0;

    // Лэйауты кнопок
    this.buttons = {
      [GameStates.Playing]: [],
      [GameStates.ShopOpen]: [],
    };

    this.init();
  }

  private loadResources(): void {
    const {
      COIN_SPRITE,
      ENEMY_SPRITE,
      BACKGROUND_SPRITE,
      HERO_SPRITE,
      BASE_SPRITE,
    } = sprites;

    this.resourceManager.load([
      { name: ResourceNames.HeroImage, url: HERO_SPRITE.url },
      { name: ResourceNames.BaseImage, url: BASE_SPRITE.url },
      { name: ResourceNames.EnemyImage, url: ENEMY_SPRITE.url },
      {
        name: ResourceNames.BackgroundImage,
        url: BACKGROUND_SPRITE.url,
      },
      { name: ResourceNames.CoinImage, url: COIN_SPRITE.url },
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
        case 'q':
        case 'й':
          this.toggleShop();
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
      const rect = this.canvas.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const relativeY = e.clientY - rect.top;
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

      const rect = this.canvas.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const relativeY = e.clientY - rect.top;
      const startX = this.hero.x + this.hero.width / 2;
      const startY = this.hero.y + this.hero.height / 2;

      const bullet = new Bullet(0, 0, this.canvas, this.ctx);
      bullet.shoot({ x: startX, y: startY }, { x: relativeX, y: relativeY });
      this.bullets.push(bullet);
    });

    this.registerButton(
      {
        x: this.canvas.width / 4 + 10,
        y: this.canvas.height / 4 + 10,
        width: 200,
        height: 40,
        text: 'Починить базу',
      },
      this.fixBase,
      GameStates.ShopOpen
    );
  }

  private fixBase = () => {
    if (this.money < 10) {
      return;
    }
    this.money -= 10;
    this.base.health += 50;
  };

  private registerButton = (
    buttonParams: ButtonParams,
    callback: () => void,
    gameStateLayout: GameStates
  ) => {
    const button = new Button({
      ...buttonParams,
      canvas: this.canvas,
      ctx: this.ctx,
    });

    this.buttons[gameStateLayout].push(button);

    this.clickCallbacks.push((e, gameState) => {
      if (gameState !== gameStateLayout) {
        return;
      }

      const rect = this.canvas.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const relativeY = e.clientY - rect.top;

      if (
        relativeX > button.x &&
        relativeX < button.x + button.width &&
        relativeY > button.y &&
        relativeY < button.y + button.height
      ) {
        callback();
      }
    });
  };

  private startEnemyAttackInterval(enemy: Enemy, index: number) {
    // Проверяем, атаковал ли враг
    if (!this.activeAttackIntervals.has(index)) {
      // Добавляем идентификатор интервала в множество активных интервалов
      this.activeAttackIntervals.add(index);

      const damage = enemy.getDamage(); // Получаем урон от врага
      this.base.receiveDamage(damage); // Передаем урон базе

      // После того, как атака перезарядится, даем возможноть атаковать снова
      setTimeout(() => {
        this.activeAttackIntervals.delete(index);
      }, enemy.attackInterval);
    }
  }

  public toggleShop() {
    if (this.gameState === GameStates.ShopOpen) {
      this.gameState = GameStates.Playing;
      return;
    }
    this.gameState = GameStates.ShopOpen;
  }

  public placeCoin(x: number, y: number) {
    const sprite = new Sprite(
      this.ctx,
      this.resourceManager.get(ResourceNames.CoinImage)
    );

    const coin = new Coin(x, y, this.canvas, this.ctx, sprite, () => {
      this.money += 10;
    });
    this.items.push(coin);
  }

  private drawStats() {
    this.ctx.font = '24px Arial';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText('$: ' + this.money.toString(), 20, 40);

    this.ctx.font = '16px Arial';
    this.ctx.fillText('[Q] - открыть магазин', 20, 65);
  }

  // Обновление состояние объектов
  public update() {
    if (this.gameState !== GameStates.Playing) {
      return;
    }

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
            const { x, y } = this.enemies.splice(enemyIndex, 1)[0]; // Удаляем врага
            this.placeCoin(x, y);
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

  private drawGameFrame() {
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

    this.items = this.items.filter(item => {
      if (isCollision(this.hero, item)) {
        item.pickUp();
        return false;
      }
      item.draw();
      return true;
    });

    this.base.draw();
  }

  private drawShop() {
    this.ctx.fillStyle = 'white';
    this.ctx.rect(
      this.canvas.width / 4,
      this.canvas.height / 4,
      this.canvas.width / 2,
      this.canvas.height / 2
    );
    this.ctx.fill();
    this.buttons[GameStates.ShopOpen].forEach(button => {
      button.draw();
    });
  }

  public draw() {
    // Очистка canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawBackground();

    switch (this.gameState) {
      case GameStates.Playing:
        this.drawGameFrame();
        break;
      case GameStates.ShopOpen:
        this.drawShop();
        break;
    }

    this.drawStats();
  }
}
