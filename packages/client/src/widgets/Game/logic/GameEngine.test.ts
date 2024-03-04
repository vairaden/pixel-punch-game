import { Bullet, Enemy, GameEngine, Sprite } from './index';
import * as isCollisionModule from '../lib/isCollision';

// Создаем заглушки для внешних зависимостей
jest.mock('./Hero', () => ({
  Hero: jest.fn().mockImplementation(() => ({
    update: jest.fn(),
    draw: jest.fn(),
    moveUp: jest.fn(),
    moveLeft: jest.fn(),
    moveDown: jest.fn(),
    moveRight: jest.fn(),
    stopX: jest.fn(),
    stopY: jest.fn(),
    stop: jest.fn(),
    getDamage: jest.fn(),
    recieveDamage: jest.fn(),
    updateZiel: jest.fn(),
    width: 10,
    height: 10,
    health: 100,
  })),
}));

jest.mock('./Base', () => ({
  Base: jest.fn().mockImplementation(() => ({
    update: jest.fn(),
    draw: jest.fn(),
    receiveDamage: jest.fn(),
    width: 10,
    height: 10,
    health: 100,
  })),
}));

jest.mock('./Enemy', () => ({
  Enemy: jest.fn().mockImplementation(() => ({
    update: jest.fn(),
    draw: jest.fn(),
    move: jest.fn(),
    stop: jest.fn(),
    getDamage: jest.fn(),
    receiveDamage: jest.fn(),
    width: 10,
    height: 10,
    attackInterval: 1000,
    health: 100,
  })),
}));

jest.mock('./Bullet', () => ({
  Bullet: jest.fn().mockImplementation(() => ({
    update: jest.fn(),
    draw: jest.fn(),
    shoot: jest.fn(),
    width: 10,
    height: 10,
  })),
}));

jest.mock('./Ziel', () => ({
  Ziel: jest.fn().mockImplementation(() => ({
    updateCoordinates: jest.fn(),
    draw: jest.fn(),
    width: 10,
    height: 10,
  })),
}));

jest.mock('./Sprite', () => ({
  Sprite: jest.fn().mockImplementation(() => ({
    update: jest.fn(),
    setAnimationParams: jest.fn(),
    draw: jest.fn(),
  })),
}));

jest.mock('./ResourceManager', () => ({
  ResourceManager: jest.fn().mockImplementation(() => ({
    load: jest.fn(),
    get: jest.fn(),
  })),
}));

describe('GameEngine', () => {
  let gameEngine: GameEngine;
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let gameOverCallback: jest.Mock<void, []>;
  let mockSprite: Sprite;
  const isCollisionSpy = jest.spyOn(isCollisionModule, 'isCollision');

  beforeEach(() => {
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    gameOverCallback = jest.fn();
    gameEngine = new GameEngine(canvas, ctx, gameOverCallback);
    mockSprite = new Sprite(ctx, new Image());
  });

  test('Создание экземпляра класса GameEngine', () => {
    expect(gameEngine).toBeInstanceOf(GameEngine);
  });

  test('Проверка расчета столкновения игрока с противником', () => {
    const enemy = new Enemy(0, 0, canvas, ctx, mockSprite);
    gameEngine['enemies'].push(enemy);

    gameEngine.update();

    expect(isCollisionSpy).toHaveBeenCalledWith(gameEngine['hero'], enemy);

    isCollisionSpy.mockRestore();
  });

  test('Игра должна вызвать gameOverCallback, когда здоровье героя равно 0', () => {
    gameEngine['hero'].health = 0;

    gameEngine.update();

    expect(gameOverCallback).toHaveBeenCalled();
  });

  test('Игра должна вызвать gameOverCallback, когда здоровье базы равно 0', () => {
    gameEngine['base'].health = 0;

    gameEngine.update();

    expect(gameOverCallback).toHaveBeenCalled();
  });
});
