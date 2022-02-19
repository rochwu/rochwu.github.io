import {useLayoutEffect, useRef} from 'react';
import {useGps} from '../GpsContext';

export function useButtonRef() {
  const ref = useRef<HTMLButtonElement>(null);
  const gps = useGps();

  // I am changing the button way often to keep up its dimensions
  useLayoutEffect(() => {
    const button = ref.current;

    if (button) {
      const {width, height} = button.getBoundingClientRect();
      gps.set('button', {width, height});
    }
  }, [gps]);

  return ref;
}
