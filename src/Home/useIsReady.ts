import {useEffect, useState} from 'react';

import {useWillMount} from '../useWillMount';

export const useIsReady = () => {
  const [isReady, setIsReady] = useState(false);

  const wake = () => {
    // eslint-disable-next-line
    removeListeners();

    window.setTimeout(() => {
      setIsReady(true);
    }, 333);
  };

  const removeListeners = () => {
    window.removeEventListener('mousemove', wake);
    window.removeEventListener('keydown', wake);
  };

  // We wanna make super sure the listeners are mounted before the user starts playing with us
  useWillMount(() => {
    window.addEventListener('mousemove', wake);
    window.addEventListener('keydown', wake);
  });

  useEffect(() => removeListeners, []);

  return isReady;
};
