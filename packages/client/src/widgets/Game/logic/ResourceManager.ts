type imageUrl = {
  name: string;
  url: string;
};

export class ResourceManager {
  private resourceCache: { [url: string]: HTMLImageElement };
  private readyCallbacks: (() => void)[];

  constructor() {
    this.resourceCache = {};
    this.readyCallbacks = [];
  }

  public load(img: imageUrl | imageUrl[]) {
    let resources = [];

    if (!Array.isArray(img)) {
      resources = [img];
    } else {
      resources = [...img];
    }

    resources.forEach(image => {
      this.loadResource(image.name, image.url);
    });
  }

  private loadResource(name: string, url: string) {
    if (this.resourceCache[name]) {
      return this.resourceCache[name];
    } else {
      const img = new Image();
      img.src = url;
      this.resourceCache[name] = img;
      // TODO: добавить асинхронный обработчик загрузки изображений img.onload
    }
  }

  public get(url: string): HTMLImageElement {
    return this.resourceCache[url];
  }

  public isReady(): boolean {
    let ready = true;
    for (const k in this.resourceCache) {
      if (
        Object.prototype.hasOwnProperty.call(this.resourceCache, k) &&
        !this.resourceCache[k]
      ) {
        ready = false;
      }
    }
    return ready;
  }

  public onReady(func: () => void) {
    this.readyCallbacks.push(func);
  }
}
