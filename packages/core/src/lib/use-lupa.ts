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

    const mouseMoveListener = debounce(magnify, 0);

    document.addEventListener('mousemove', mouseMoveListener);

    return document.removeEventListener('mousemove', mouseMoveListener);
  }, [size]);
};
