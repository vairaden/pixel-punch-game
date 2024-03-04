import { Hero, Sprite } from './index';
import { config } from '../config';

const { HERO } = config;
jest.mock('./Sprite', () => {
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
  let hero: Hero;

  beforeEach(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    const mockSprite = new Sprite(ctx, new Image());
    hero = new Hero(0, 0, canvas, ctx, mockSprite);
  });

  test('Перемещение вверх', () => {
    hero.moveUp();
    expect(hero.dy).toBe(-HERO.speed);
  });

  test('Перемещение вниз', () => {
    hero.moveDown();
    expect(hero.dy).toBe(HERO.speed);
  });

  test('Перемещение вправо', () => {
    hero.moveRight();
    expect(hero.dx).toBe(HERO.speed);
  });

  test('Перемещение влево', () => {
    hero.moveLeft();
    expect(hero.dx).toBe(-HERO.speed);
  });

  test('Остановка героя', () => {
    hero.moveDown();
    hero.moveRight();

    hero.stop();
    expect(hero.dx).toBe(0);
    expect(hero.dy).toBe(0);
  });

  test('Перемещение по героя по карте', () => {
    hero.moveDown();
    hero.moveRight();

    hero.update();
    expect(hero.x).toBe(hero.dx);
    expect(hero.y).toBe(hero.dy);
  });

  test('Герой не выходит за пределы карты', () => {
    hero.moveUp();
    hero.moveLeft();

    hero.update();
    expect(hero.x).toBe(0);
    expect(hero.y).toBe(0);
  });

  test('Получение урона героем', () => {
    const initialHealth = hero.health;
    const damage = 10;

    hero.recieveDamage(damage);
    expect(hero.health).toBe(initialHealth - damage);
  });
});
