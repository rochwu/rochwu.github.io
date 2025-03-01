import {CSSProperties, useLayoutEffect, useState, VFC} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import styled from '@emotion/styled';

import {breakPositionState, setUnlockState} from '../state';
import {ButtonText} from '../ButtonText';
import {useGps} from '../GpsContext';
import {goToGitHub} from '../goToGitHub';

const Container = styled.button({
  all: 'unset',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',

  cursor: 'pointer',
});

export const LostText: VFC = () => {
  const gps = useGps();
  const [style, setStyle] = useState<CSSProperties>();

  const position = useRecoilValue(breakPositionState);
  const unlock = useSetRecoilState(setUnlockState);

  // We don't wanna flicker since the button will display:none
  // the fuck out of there
  useLayoutEffect(() => {
    if (position) {
      unlock('buttonBreak');

      const {width, height} = gps.get('button');

      setStyle({
        top: `${position.top}%`,
        left: `${position.left}%`,
        width,
        height,
      });
    }
  }, [position, gps, unlock]);

  if (!position) {
    return null;
  }

  return (
    <Container aria-hidden style={style} onClick={goToGitHub} tabIndex={-1}>
      <ButtonText />
    </Container>
  );
};
