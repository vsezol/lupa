import { useEffect, useRef } from 'react';
import { debounce } from './debounce';
import { Magnifier } from './magnifier';

interface LupaOptions {
  size: number;
  renderOnIdle?: boolean;
  renderOnMove?: boolean;
}

export const useLupa = ({
  size,
  renderOnIdle = false,
  renderOnMove = false,
}: LupaOptions) => {
  const magnifier = useRef<Magnifier>();
  const lastEvent = useRef<MouseEvent>();

  const render = () => {
    magnifier?.current?.render();

    if (lastEvent?.current) {
      const { x, y } = lastEvent.current;
      magnifier.current?.magnify(x, y);
    }

    if (renderOnIdle) {
      requestIdleCallback(() => {
        render();
      });
    }
  };

  useEffect(() => {
    magnifier.current = new Magnifier(size);

    const magnify = (event: MouseEvent) => {
      lastEvent.current = event;

      magnifier.current?.setPosition(event.x, event.y);
      magnifier.current?.magnify(event.x, event.y);

      if (renderOnMove) {
        render();
      }
    };

    render();

    const mouseMoveListener = debounce(magnify, 0);

    window.addEventListener('mousemove', mouseMoveListener);

    return () => window.removeEventListener('mousemove', mouseMoveListener);
  }, []);

  return {
    render,
  };
};
