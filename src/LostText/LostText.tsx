import {CSSProperties, useLayoutEffect, useState, VFC} from 'react';
import {useRecoilValue} from 'recoil';
import styled from '@emotion/styled';

import {breakPositionState} from '../state';
import {ButtonText} from '../ButtonText';
import {useGps} from '../GpsContext';

const Container = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
});

export const LostText: VFC = () => {
  const gps = useGps();
  const [style, setStyle] = useState<CSSProperties>();

  const position = useRecoilValue(breakPositionState);

  // We don't wanna flicker since the button will display:none
  // the fuck out of there
  useLayoutEffect(() => {
    if (position) {
      const {width, height} = gps.get('button');

      setStyle({
        top: `${position.top}%`,
        left: `${position.left}%`,
        width,
        height,
      });
    }
  }, [position, gps]);

  if (!position) {
    return null;
  }

  return (
    <Container aria-hidden style={style}>
      <ButtonText />
    </Container>
  );
};
