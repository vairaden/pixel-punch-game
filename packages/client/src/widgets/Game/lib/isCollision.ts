import { CircleGameObject, RectangleGameObject } from './types';

type GameObject = CircleGameObject | RectangleGameObject;

const isCircle = (gameObj: GameObject): gameObj is CircleGameObject => {
  return 'radius' in gameObj;
};

const isRectangle = (gameObj: GameObject): gameObj is RectangleGameObject => {
  return 'width' in gameObj && 'height' in gameObj;
};

const isCirclesCollision = (
  firstObj: CircleGameObject,
  secObj: CircleGameObject
): boolean => {
  const dx = firstObj.x - secObj.x;
  const dy = firstObj.y - secObj.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < firstObj.radius + secObj.radius;
};

const isRectanglesCollision = (
  firstObj: RectangleGameObject,
  secObj: RectangleGameObject
): boolean => {
  const firstRectCenterX = firstObj.x + firstObj.width / 2;
  const firstRectCenterY = firstObj.y + firstObj.height / 2;

  const secRectCenterX = secObj.x + secObj.width / 2;
  const secRectCenterY = secObj.y + secObj.height / 2;

  const distX = Math.abs(firstRectCenterX - secRectCenterX);
  const distY = Math.abs(firstRectCenterY - secRectCenterY);

  if (
    distX <= firstObj.width / 2 + secObj.width / 2 &&
    distY <= firstObj.height / 2 + secObj.height / 2
  ) {
    return true;
  } else {
    return false;
  }
};

const isCircleRectangleCollision = (
  firstObj: CircleGameObject,
  secObj: RectangleGameObject
): boolean => {
  const closestX = Math.max(
    secObj.x,
    Math.min(firstObj.x, secObj.x + secObj.width)
  );
  const closestY = Math.max(
    secObj.y,
    Math.min(firstObj.y, secObj.y + secObj.height)
  );

  const distX = firstObj.x - closestX;
  const distY = firstObj.y - closestY;

  return distX * distX + distY * distY <= firstObj.radius * firstObj.radius;
};

// Проверяем, пересекаются ли координаты двух объектов
export function isCollision(firstObj: GameObject, secObj: GameObject): boolean {
  // Проверка столкновения для окружностей
  if (isCircle(firstObj) && isCircle(secObj)) {
    return isCirclesCollision(firstObj, secObj);
    // Проверка столкновения для прямоугольников
  } else if (isRectangle(firstObj) && isRectangle(secObj)) {
    return isRectanglesCollision(firstObj, secObj);
    // Проверка столкновения для окружности и прямоугольника
  } else if (isCircle(firstObj) && isRectangle(secObj)) {
    return isCircleRectangleCollision(firstObj, secObj);
    // Обратная проверка столкновения для прямоугольника и окружности
  } else if (isRectangle(firstObj) && isCircle(secObj)) {
    return isCircleRectangleCollision(secObj, firstObj);
  } else {
    throw new Error(
      'Не поддерживаемые типы объектов. Объекты могут быть либо прямоугольниками, либо окружностями.'
    );
  }
}
