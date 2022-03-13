import {RefObject, useEffect, useReducer, useRef} from 'react';

import {componentWidth} from './dimensions';

const {body} = window.document;

export const useWidthRefs = <E extends HTMLElement>(ref: RefObject<E>) => {
  // Using forceupdate to ensure right vars on useDrag callback
  const forceUpdate = useReducer(() => [], [])[1];
  const width = useRef(componentWidth);
  const offset = useRef(0);

  useEffect(() => {
    const updateWidth = () => {
      const element = ref.current!.getBoundingClientRect();
      const container = body.getBoundingClientRect();

      if (container.width < componentWidth) {
        width.current = container.width;
      } else {
        width.current = componentWidth;
      }

      offset.current = element.left;
      forceUpdate();
    };

    updateWidth();

    const observer = new ResizeObserver(updateWidth);

    observer.observe(body);

    return () => {
      observer.disconnect();
    };
  }, []);

  return {width, offset};
};
