import {useLayoutEffect, useState} from 'react';

export const useIsReady = () => {
  const [isReady, setIsReady] = useState(false);

  // We wanna make super sure the listeners are mounted before the user starts playing with us
  useLayoutEffect(() => {
    const wake = () => {
      window.setTimeout(() => {
        setIsReady(true);
      }, 333);

      // eslint-disable-next-line
      removeListeners();
    };

    const removeListeners = () => {
      window.removeEventListener('mousemove', wake);
      window.removeEventListener('keydown', wake);
    };

    window.addEventListener('mousemove', wake);
    window.addEventListener('keydown', wake);

    return () => {
      removeListeners();
    };
  }, []);

  return isReady;
};
