import { CircleGameObject, RectangleGameObject } from './types';

type GameObject = CircleGameObject | RectangleGameObject;

const isCircle = (gameObj: GameObject): gameObj is CircleGameObject => {
  return 'radius' in gameObj;
};

const isRectangle = (gameObj: GameObject): gameObj is RectangleGameObject => {
  return 'width' in gameObj && 'height' in gameObj;
};

export function isCollision(firstObj: GameObject, secObj: GameObject): boolean {
  // Проверяем, пересекаются ли координаты двух объектов
  if (isCircle(firstObj) && isCircle(secObj)) {
    // Проверка столкновения для окружностей
    const dx = firstObj.x - secObj.x;
    const dy = firstObj.y - secObj.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < firstObj.radius + secObj.radius;
  } else if (isRectangle(firstObj) && isRectangle(secObj)) {
    // Проверка столкновения для прямоугольников
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
  } else if (isCircle(firstObj) && isRectangle(secObj)) {
    // Проверка столкновения для окружности и прямоугольника
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
  } else if (isRectangle(firstObj) && isCircle(secObj)) {
    // Обратная проверка столкновения для прямоугольника и окружности
    const closestX = Math.max(
      firstObj.x,
      Math.min(secObj.x, firstObj.x + firstObj.width)
    );
    const closestY = Math.max(
      firstObj.y,
      Math.min(secObj.y, firstObj.y + firstObj.height)
    );

    const distX = secObj.x - closestX;
    const distY = secObj.y - closestY;

    return distX * distX + distY * distY <= secObj.radius * secObj.radius;
  } else {
    throw new Error(
      'Unsupported game object types. Both objects must be either circles or rectangles.'
    );
  }
}
