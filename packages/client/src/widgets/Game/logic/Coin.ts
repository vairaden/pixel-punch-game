import { config, sprites } from '../config';
import { Sprite } from './Sprite';
import GameItem from '@/widgets/Game/logic/GameItem';

const { COIN } = config;
const { COIN_SPRITE } = sprites;

export class Coin<CallbackCtx = unknown> extends GameItem<CallbackCtx> {
  private dx: number;
  private dy: number;
  private sprite: Sprite;
  protected pickupCallback: (ctx: CallbackCtx) => void;

  public height: number;
  public width: number;

  constructor(
    x: number,
    y: number,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    sprite: Sprite,
    pickupCallback: (ctx: CallbackCtx) => void
  ) {
    super(x, y, ctx, canvas);
    this.height = COIN.height;
    this.width = COIN.width;
    this.dx = 0;
    this.dy = 0;
    this.sprite = sprite;
    this.pickupCallback = pickupCallback;
  }

  public pickUp(ctx: CallbackCtx) {
    this.pickupCallback(ctx);
  }

  public update() {
    this.x += this.dx;
    this.y += this.dy;
  }

  public draw() {
    this.sprite.draw({
      x: this.x,
      y: this.y,
      imgWidth: COIN_SPRITE.size.width,
      imgHeight: COIN_SPRITE.size.height,
      imgY: COIN_SPRITE.size.offsetY,
      drawWidth: this.width,
      drawHeight: this.height,
    });
  }
}
