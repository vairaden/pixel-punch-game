import { Enemy } from '../entities';
import { Sprite } from '../utils';
import { config } from '../config';

const { ENEMY } = config;
jest.mock('../utils/Sprite', () => {
  return {
    Sprite: jest.fn().mockImplementation(() => {
      return {
        update: jest.fn(),
        setAnimationParams: jest.fn(),
        draw: jest.fn(),
      };
    }),
  };
});

describe('Класс Героя', () => {
  let enemy: Enemy;

  beforeEach(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    const mockSprite = new Sprite(ctx, new Image());
    enemy = new Enemy(0, 0, canvas, ctx, mockSprite);
  });

  test('Перемещение противника', () => {
    enemy.move();
    enemy.update();
    expect(enemy.x).toBeGreaterThan(0);
    expect(enemy.y).toBeGreaterThan(0);
  });

  test('Остановка противника', () => {
    enemy.move();
    enemy.stop();
    expect(enemy.x).toBe(0);
    expect(enemy.y).toBe(0);
  });

  test('Получение урона противником', () => {
    const initialHealth = enemy.health;
    const damage = 10;

    enemy.recieveDamage(damage);
    expect(enemy.health).toBe(initialHealth - damage);
  });

  test('Получение значения урона', () => {
    expect(enemy.getDamage()).toBe(ENEMY.damage);
  });

  test('Получение интервала атаки', () => {
    expect(enemy.getAttackSpeed()).toBe(ENEMY.attackInterval);
  });
});
