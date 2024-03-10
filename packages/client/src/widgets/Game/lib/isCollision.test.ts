import { isCollision } from './isCollision';
import { CircleGameObject, RectangleGameObject } from './types';

describe('isCollision', () => {
  test('Проверка пересечения двух окружностей', () => {
    const circle1: CircleGameObject = {
      x: 50,
      y: 50,
      radius: 10,
    };

    const circle2: CircleGameObject = {
      x: 70,
      y: 70,
      radius: 20,
    };

    expect(isCollision(circle1, circle2)).toBeTruthy;
  });

  test('Проверка не пересечения двух окружностей', () => {
    const circle1: CircleGameObject = {
      x: 0,
      y: 0,
      radius: 10,
    };

    const circle2: CircleGameObject = {
      x: 30,
      y: 30,
      radius: 10,
    };

    expect(isCollision(circle1, circle2)).toBeFalsy;
  });

  test('Проверка соприкосновения двух окружностей', () => {
    const circle1: CircleGameObject = {
      x: 10,
      y: 10,
      radius: 5,
    };

    const circle2: CircleGameObject = {
      x: 20,
      y: 10,
      radius: 5,
    };

    expect(isCollision(circle1, circle2)).toBeTruthy;
  });

  test('Проверка пересечения двух прямоугольников', () => {
    const rect1: RectangleGameObject = {
      x: 10,
      y: 14,
      width: 15,
      height: 24,
    };

    const rect2: RectangleGameObject = {
      x: -3,
      y: -7,
      width: 24,
      height: 5,
    };

    expect(isCollision(rect1, rect2)).toBeTruthy;
  });

  test('Проверка не пересечения двух прямоугольников', () => {
    const rect1: RectangleGameObject = {
      x: -13,
      y: 14,
      width: 5,
      height: 10,
    };

    const rect2: RectangleGameObject = {
      x: 30,
      y: 20,
      width: 5,
      height: 4,
    };

    expect(isCollision(rect1, rect2)).toBeFalsy;
  });

  test('Проверка соприкосновения двух прямоугольников', () => {
    const rect1: RectangleGameObject = {
      x: 23,
      y: 5,
      width: 5,
      height: 10,
    };

    const rect2: RectangleGameObject = {
      x: -3,
      y: -2,
      width: 26,
      height: 3,
    };

    expect(isCollision(rect1, rect2)).toBeTruthy;
  });

  test('Проверка пересечения прямоугольника и окружности', () => {
    const rect: RectangleGameObject = {
      x: -7,
      y: -7,
      width: 10,
      height: 8,
    };

    const circle: CircleGameObject = {
      x: 4,
      y: 4,
      radius: 38,
    };

    expect(isCollision(rect, circle)).toBeTruthy;
  });

  test('Проверка не пересечения прямоугольника и окружности', () => {
    const rect: RectangleGameObject = {
      x: -33,
      y: 20,
      width: 10,
      height: 8,
    };

    const circle: CircleGameObject = {
      x: 15,
      y: 40,
      radius: 14,
    };

    expect(isCollision(rect, circle)).toBeTruthy;
  });

  test('Проверка соприкосновения прямоугольника и окружности', () => {
    const rect: RectangleGameObject = {
      x: 100500,
      y: 100500,
      width: 5,
      height: 10,
    };

    const circle: CircleGameObject = {
      x: 100510,
      y: 100500,
      radius: 5,
    };

    expect(isCollision(rect, circle)).toBeTruthy;
  });
});
