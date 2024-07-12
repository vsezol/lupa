import html2canvas from 'html2canvas';

const DEFAULT_SIZE_PX = 100;

export class Magnifier {
  readonly #wrapperElement: HTMLElement;
  readonly #rootElement: HTMLElement;
  readonly #size;

  constructor(
    size: number = DEFAULT_SIZE_PX,
    wrapperElement: HTMLElement = createMagnifierWrapper(size)
  ) {
    this.#size = size;
    this.#rootElement = document.body;
    this.#wrapperElement = wrapperElement;
    this.#rootElement.appendChild(this.#wrapperElement);
  }

  async magnify(x: number, y: number): Promise<void> {
    const canvas = await this.#toCanvas(x, y);

    if (!canvas) {
      throw new Error('Magnifier: failed to magnify');
    }

    this.#wrapperElement.replaceChildren(canvas);
  }

  setPosition(x: number, y: number): void {
    this.#wrapperElement.style.left = `${x - this.#size / 2}px`;
    this.#wrapperElement.style.top = `${y - this.#size / 2}px`;
  }

  async #toCanvas(
    x: number,
    y: number
  ): Promise<HTMLCanvasElement | undefined> {
    const canvas = await html2canvas(this.#rootElement, {
      logging: false,
      imageTimeout: 0,
      ignoreElements: (element) => element.id === this.#wrapperElement.id,
    });

    const newCanvas = cropCanvas(canvas, x, y, this.#size);

    if (!newCanvas) {
      return;
    }

    return newCanvas;
  }
}

function cropCanvas(
  canvas: HTMLCanvasElement,
  x: number,
  y: number,
  size: number
): HTMLCanvasElement | undefined {
  const newCanvas = document.createElement('canvas');
  const context = newCanvas.getContext('2d');

  if (!context) {
    return;
  }

  newCanvas.width = size;
  newCanvas.height = size;

  const pixelRatio = window.devicePixelRatio;
  context.drawImage(
    canvas,
    x * pixelRatio - size / 2,
    y * pixelRatio - size / 2,
    size,
    size,
    0,
    0,
    size,
    size
  );

  return newCanvas;
}

function createMagnifierWrapper(size: number): HTMLElement {
  const magnifier = document.createElement('div');

  magnifier.id = `magnifier-${getUniqString()}`;

  magnifier.style.width = `${size}px`;
  magnifier.style.height = `${size}px`;
  magnifier.style.zIndex = '10';
  magnifier.style.border = '3px solid white';
  magnifier.style.borderRadius = '100%';
  magnifier.style.position = 'absolute';
  magnifier.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
  magnifier.style.overflow = 'hidden';
  magnifier.style.cursor = 'none';
  magnifier.style.willChange = 'auto';

  return magnifier;
}

function getUniqString(length = 4): string {
  return Date.now().toString().slice(-length);
}
