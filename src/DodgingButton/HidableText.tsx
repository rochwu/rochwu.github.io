import styled from '@emotion/styled';
import {useLayoutEffect, useRef} from 'react';
import {useRecoilValue} from 'recoil';

import {isButtonBroken} from '../state';
import {ButtonText} from '../ButtonText';
import {useGps} from '../GpsContext';

const Text = styled(ButtonText)<{isVisible: boolean}>(({isVisible}) => {
  return {visibility: isVisible ? 'visible' : 'hidden'};
});

export const HidableText = () => {
  const isVisible = !useRecoilValue(isButtonBroken);
  const ref = useRef<HTMLSpanElement>(null);
  const gps = useGps();

  useLayoutEffect(() => {
    const text = ref.current;

    if (text) {
      const {width, height} = text.getBoundingClientRect();
      gps.set('buttonText', {width, height});
    }
  }, [gps]);

  return <Text ref={ref} isVisible={isVisible} aria-hidden />;
};
