import styled from '@emotion/styled';
import {useEffect, useRef, VFC} from 'react';
import {useRecoilValue} from 'recoil';

import {isButtonBroken} from '../state';
import {ButtonText} from '../ButtonText';
import {useGps} from '../GpsContext';

const Text = styled(ButtonText)<{isVisible: boolean}>(({isVisible}) => {
  return {opacity: isVisible ? '100%' : '5%'};
});

export const HidableText: VFC = () => {
  const isVisible = !useRecoilValue(isButtonBroken);
  const ref = useRef<HTMLSpanElement>(null);
  const gps = useGps();

  useEffect(() => {
    const text = ref.current;

    if (text) {
      const {width, height} = text.getBoundingClientRect();
      gps.set('buttonText', {width, height});
    }
  }, [gps]);

  return <Text ref={ref} isVisible={isVisible} aria-hidden />;
};
