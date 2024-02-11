import html2canvas from "html2canvas";
import { setupCounter } from "./counter.ts";
import "./style.css";
import typescriptLogo from "./typescript.svg";
import viteLogo from "./vite.svg";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>pupa-lupa</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati veniam, corrupti repudiandae fugiat quaerat nostrum excepturi blanditiis sapiente vitae perspiciatis ullam illo fugit recusandae nemo dignissimos harum? Praesentium pariatur quisquam provident recusandae alias atque enim accusantium odio, quod itaque qui incidunt perspiciatis optio unde, aliquam eius aliquid dignissimos omnis? Commodi voluptatem totam voluptatum nesciunt perspiciatis accusamus cupiditate libero id provident porro, veniam beatae quaerat nemo suscipit corrupti quas molestias cum, vel error consectetur deleniti officia modi? Molestias aliquid ratione tempore vitae blanditiis ullam. Numquam, exercitationem earum. Enim nam ut vitae numquam itaque, earum incidunt repudiandae, harum exercitationem labore ducimus quasi.
    </p>
  </div>
`;

setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);

const SIZE = 300;
const magnifierId = "magnifier";
const magnifier = createMagnifier(SIZE);

document.body.appendChild(magnifier);

const mouseMoveListener = debounce(magnify, 0);

document.addEventListener("mousemove", mouseMoveListener);

async function magnify(event: MouseEvent) {
  magnifier.style.left = `${event.x - SIZE / 2}px`;
  magnifier.style.top = `${event.y - SIZE / 2}px`;

  const target = document.body;

  const canvas = await convertElementToCanvas(target, event.x, event.y, SIZE);

  if (!canvas) {
    return;
  }

  if (magnifier.children[0] instanceof HTMLElement) {
    magnifier.children[0].remove();
  }
  magnifier.appendChild(canvas);
}

function createMagnifier(size: number): HTMLElement {
  const magnifier = document.createElement("div");

  magnifier.id = "magnifier";
  magnifier.style.width = `${size}px`;
  magnifier.style.height = `${size}px`;
  magnifier.style.zIndex = "10";
  magnifier.style.border = "3px solid white";
  magnifier.style.borderRadius = "100%";
  magnifier.style.position = "absolute";
  magnifier.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
  magnifier.style.overflow = "hidden";
  magnifier.style.cursor = "none";
  magnifier.style.willChange = "auto";

  return magnifier;
}

async function convertElementToCanvas(
  element: HTMLElement,
  x: number,
  y: number,
  size: number
): Promise<HTMLCanvasElement | undefined> {
  const canvas = await html2canvas(element, {
    logging: false,
    imageTimeout: 0,
    ignoreElements: (element) => element.id === magnifierId,
  });

  const newCanvas = cropCanvas(canvas, x, y, size);

  if (!newCanvas) {
    return;
  }

  return newCanvas;
}

function cropCanvas(
  canvas: HTMLCanvasElement,
  x: number,
  y: number,
  size: number
): HTMLCanvasElement | undefined {
  const newCanvas = document.createElement("canvas");
  const context = newCanvas.getContext("2d");

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

type BaseFunction = (...args: any[]) => unknown;

export function debounce<T extends BaseFunction>(
  callback: T,
  timeout: number
): (...args: Parameters<T>) => void {
  let timerId: number;

  return (...args: Parameters<T>): void => {
    clearTimeout(timerId);

    timerId = window.setTimeout(() => callback(...args), timeout);
  };
}
