import { useEffect } from 'react';
import { debounce } from './debounce';
import { Magnifier } from './magnifier';

interface LupaOptions {
  size: number;
}

export const useLupa = ({ size }: LupaOptions) => {
  useEffect(() => {
    const magnifier = new Magnifier(size);

    const magnify = (event: MouseEvent) => {
      magnifier.setPosition(event.x, event.y);
      magnifier.magnify(event.x, event.y);
    };

    // const render = () => {
    //   magnifier.render();

    //   requestIdleCallback(render);
    // };

    // render();
    magnifier.render();

    const mouseMoveListener = debounce(magnify, 0);

    window.addEventListener('mousemove', mouseMoveListener);

    return () => window.removeEventListener('mousemove', mouseMoveListener);
  }, []);
};
