import { GameObject } from '@/widgets/Game/utils';

export abstract class GameItem<CallbackCtx = undefined> extends GameObject {
  abstract height: number;
  abstract width: number;
  protected abstract pickupCallback: (ctx: CallbackCtx) => void;

  abstract pickUp(ctx?: CallbackCtx): void;
}
