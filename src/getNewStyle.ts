import {Metadata} from './types';

const computePosition = (container: number, child: number) => {
  const difference = container - child;
  const newPosition = Math.random() * difference;

  if (difference < newPosition) {
    alert(`We're fucked ${difference} < ${newPosition}`);
  }

  return (newPosition / container) * 100;
};

export const getNewStyle = (container: Metadata, child: Metadata) => {
  const left = computePosition(container.width, child.width);
  const top = computePosition(container.height, child.height);

  return {top, left};
};
