import {useRef} from 'react';

/**
 * Sync, will run before did mount and paint
 * @param callback is only run once
 */
export const useWillMount = (callback: () => void) => {
  const didMount = useRef(false);

  if (!didMount.current) {
    didMount.current = true;
    callback();
  }
};
