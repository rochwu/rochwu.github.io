import {CSSProperties, useLayoutEffect, useState, VFC} from 'react';
import {useRecoilValue} from 'recoil';
import styled from '@emotion/styled';

import {breakPositionState} from '../state';
import {ButtonText} from '../ButtonText';
import {useGps} from '../GpsContext';
import {BUTTON} from '../constants';

const Text = styled(ButtonText)({
  position: 'absolute',
});

export const LostText: VFC = () => {
  const gps = useGps();
  const [style, setStyle] = useState<CSSProperties>();

  const position = useRecoilValue(breakPositionState);

  useLayoutEffect(() => {
    if (position) {
      const button = gps.get('button');
      const text = gps.get('buttonText');

      const widthDelta = (button.width - text.width) / 2;
      // TODO: Figure out why Y needs delta but not X
      const heightDelta =
        (button.height - BUTTON.BORDER_SIZE - text.height) / 2;

      setStyle({
        top: `${position.top}%`,
        left: `${position.left}%`,
        transform: `translate(${widthDelta}px, ${heightDelta}px)`,
      });
    }
  }, [position, gps]);

  if (!position) {
    return null;
  }

  return <Text aria-hidden style={style} />;
};
