export type Coordinate = {
  x: number;
  y: number;
};

export type CircleGameObject = Coordinate & {
  radius: number;
};

export type RectangleGameObject = Coordinate & {
  width: number;
  height: number;
};
