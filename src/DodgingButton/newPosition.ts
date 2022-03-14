import {Metadata} from '../types';

const computePosition = (container: number, child: number) => {
  const difference = container - child;
  const newPosition = Math.random() * difference;

  return (newPosition / container) * 100;
};

// TODO: Algorithm to choose screen quadrant
export const newPosition = (container: Metadata, child: Metadata) => {
  const left = computePosition(container.width, child.width);
  const top = computePosition(container.height, child.height);

  return {top, left};
};
