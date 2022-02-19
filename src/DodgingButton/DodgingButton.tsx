import styled, {CSSObject} from '@emotion/styled';
import {CSSProperties, MouseEventHandler, useState, VFC} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';

import {useGps} from '../GpsContext';
import {attemptsState, breakPositionState, isButtonBreaking} from '../state';

import {getNewStyle} from '../getNewStyle';
import {useButtonRef} from './useButtonRef';
import {initialStyle} from './initialStyle';
import {HidableText} from './HidableText';
import {BUTTON} from '../constants';

const border = `${BUTTON.BORDER_SIZE}px groove ${BUTTON.COLOR}`;

const agentOverride: CSSObject = {
  backgroundColor: 'white',
  margin: 0,
  padding: '5px 16px',
  borderRadius: '32px',
  boxSizing: 'border-box', // clearer dimension calculations
  border: border,
  ':focus': {
    outline: border,
    outlineOffset: '2px',
  },
};

const Button = styled.button(agentOverride, {
  display: 'block',
  position: 'absolute',
  font: 'initial',
});

export const DodgingButton: VFC = () => {
  const gps = useGps();
  const ref = useButtonRef();
  const [style, setStyle] = useState<CSSProperties>(initialStyle);

  const isBreaking = useRecoilValue(isButtonBreaking);
  const setAttempts = useSetRecoilState(attemptsState);
  const setBreakPosition = useSetRecoilState(breakPositionState);

  const dodge: MouseEventHandler = () => {
    const params = new URLSearchParams(document.location.search);
    if (params.get('stop') === '') {
      return;
    }

    if (isBreaking) {
      const position = gps.get('button');
      setBreakPosition({top: position.top, left: position.left});
    }

    const {top, left} = getNewStyle(gps.get('container'), gps.get('button'));

    gps.set('button', {top, left});

    setStyle({display: 'none'});
    setTimeout(() => {
      setStyle({top: `${top}%`, left: `${left}%`});
    }, 500);

    setAttempts((previous) => previous + 1);
  };

  const goToGithub = () => {
    window.location.href = 'https://github.com/rochwu';
  };

  // Inline style for performance!
  return (
    <Button
      ref={ref}
      style={style}
      onMouseEnter={dodge}
      onClick={goToGithub}
      aria-label="Link to my github at github.com/rochwu"
    >
      <HidableText />
    </Button>
  );
};
