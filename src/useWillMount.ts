import {useRef} from 'react';

/**
 * Runs before first render only
 */
export const useWillMount = (callback: () => void) => {
  const didMount = useRef(false);

  if (!didMount.current) {
    didMount.current = true;

    callback();
  }
};
