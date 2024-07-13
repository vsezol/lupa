import { useCallback, useEffect, useRef, useState } from 'react';
import { debounce } from './debounce';
import { Magnifier } from './magnifier';

interface ChangePositionEvent {
  x: number;
  y: number;
}

interface LupaOptions {
  size: number;
  renderOnIdle?: boolean;
  renderOnMove?: boolean;
  ignoreElements?: string[];
  onChangePosition?: (event: ChangePositionEvent) => unknown;
}

export const useLupa = ({
  size,
  renderOnIdle = false,
  renderOnMove = false,
  ignoreElements = [],
  onChangePosition,
}: LupaOptions) => {
  const magnifier = useRef<Magnifier>();
  const lastEvent = useRef<MouseEvent>();
  const [show, setShow] = useState<boolean>(false);

  const render = useCallback(() => {
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
  }, [magnifier, renderOnIdle]);

  const magnify = useCallback(
    debounce((event: PointerEvent) => {
      lastEvent.current = event;

      magnifier.current?.setPosition(event.x, event.y);
      magnifier.current?.magnify(event.x, event.y);

      onChangePosition?.({ x: event.x, y: event.y });

      if (renderOnMove) {
        render();
      }
    }, 0),
    [renderOnMove, magnifier, lastEvent, onChangePosition, render]
  );

  useEffect(() => {
    const destroy = () => {
      window.removeEventListener('pointermove', magnify);
      magnifier.current?.destroy();
    };

    if (!show) {
      destroy();
      return;
    }

    magnifier.current = new Magnifier(size, ignoreElements);

    render();

    window.addEventListener('pointermove', magnify);

    return () => destroy();
  }, [show]);

  return {
    render,
    show,
    setShow: (value: boolean) => setShow(value),
  };
};
