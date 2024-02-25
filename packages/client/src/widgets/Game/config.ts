import heroImg from '../../../public/heroSprites.png';
import baseImg from '../../../public/base.png';
import enemyImg from '../../../public/enemy.png';
import backgroundImg from '../../../public/grass.png';

const HERO = {
  startX: 100,
  startY: 100,
  radius: 20,
  speed: 5,
  health: 100,
  damage: 10,
};

const BASE = {
  width: 138,
  height: 86,
  health: 750,
};

const ENEMY = {
  width: 50,
  height: 50,
  speed: 0.5,
  health: 25,
  damage: 4,
  attackInterval: 500,
};

const HERO_SPRITE = {
  url: heroImg,
  legParams: {
    width: 204,
    height: 124,
    offsetY: 0,
    animation: {
      isAnimated: true,
      ticksPerFrame: 5,
      numberOfFrames: 11,
      reverseAnimation: true,
    },
  },
  bodyParams: {
    width: 253,
    height: 216,
    offsetY: 124,
    animation: {
      isAnimated: true,
      ticksPerFrame: 5,
      numberOfFrames: 9,
      reverseAnimation: true,
    },
  },
};

const ENEMY_SPRITE = {
  url: enemyImg,
  attackParams: {
    width: 195,
    height: 195,
    offsetY: 0,
    animation: {
      isAnimated: true,
      ticksPerFrame: 5,
      numberOfFrames: 9,
      reverseAnimation: false,
    },
  },
  movingParams: {
    width: 195,
    height: 195,
    offsetY: 195,
    animation: {
      isAnimated: true,
      ticksPerFrame: 5,
      numberOfFrames: 9,
      reverseAnimation: true,
    },
  },
};

const BASE_SPRITE = {
  url: baseImg,
  size: {
    width: 115,
    height: 72,
    offsetY: 0,
  },
};

const BACKGROUND_SPRITE = {
  url: backgroundImg,
  size: {
    width: 256,
    height: 256,
    offsetY: 0,
  },
};

export const config = {
  HERO,
  BASE,
  ENEMY,
};

export const sprites = {
  HERO_SPRITE,
  ENEMY_SPRITE,
  BASE_SPRITE,
  BACKGROUND_SPRITE,
};
