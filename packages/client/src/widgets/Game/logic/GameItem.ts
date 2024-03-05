import { GameObject } from '@/widgets/Game/logic/GameObject';

export default abstract class GameItem<
  CallbackCtx = unknown
> extends GameObject {
  abstract height: number;
  abstract width: number;
  protected abstract pickupCallback: (ctx: CallbackCtx) => void;

  abstract pickUp(ctx?: CallbackCtx): void;
}
