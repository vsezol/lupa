import { debounce } from "./debounce";
import { Magnifier } from "./magnifier";
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
      <button type="button">Magnify me!</button>
    </div>
    <p class="read-the-docs">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati veniam, corrupti repudiandae fugiat quaerat nostrum excepturi blanditiis sapiente vitae perspiciatis ullam illo fugit recusandae nemo dignissimos harum? Praesentium pariatur quisquam provident recusandae alias atque enim accusantium odio, quod itaque qui incidunt perspiciatis optio unde, aliquam eius aliquid dignissimos omnis? Commodi voluptatem totam voluptatum nesciunt perspiciatis accusamus cupiditate libero id provident porro, veniam beatae quaerat nemo suscipit corrupti quas molestias cum, vel error consectetur deleniti officia modi? Molestias aliquid ratione tempore vitae blanditiis ullam. Numquam, exercitationem earum. Enim nam ut vitae numquam itaque, earum incidunt repudiandae, harum exercitationem labore ducimus quasi.
    </p>
  </div>
`;

const SIZE = 300;

const magnifier = new Magnifier(SIZE);

const mouseMoveListener = debounce(magnify, 0);

document.addEventListener("mousemove", mouseMoveListener);

async function magnify(event: MouseEvent) {
  magnifier.setPosition(event.x, event.y);

  magnifier.magnify(event.x, event.y);
}
