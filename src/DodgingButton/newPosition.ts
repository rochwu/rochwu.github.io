import {Metadata} from '../types';

const percent = (container: number, child: number) => {
  // else: when viewport is shrunk unbelievably small
  const difference = container >= child ? container - child : container * 0.9;
  const newPosition = Math.random() * difference;

  return (newPosition / container) * 100;
};

// TODO: Algorithm to choose screen quadrant
export const newPosition = (container: Metadata, child: Metadata) => {
  const left = percent(container.width, child.width);
  const top = percent(container.height, child.height);

  return {top, left};
};
