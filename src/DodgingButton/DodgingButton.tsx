import {CSSProperties, MouseEventHandler, useState, VFC} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';

import {useGps} from '../GpsContext';
import {attemptsState, breakPositionState, isButtonBreaking} from '../state';
import {newPosition} from '../newPosition';

import {useButtonRef} from './useButtonRef';
import {initialStyle} from './initialStyle';
import {HidableText} from './HidableText';
import {Button} from './Button';

const goToGithub = () => {
  window.location.href = 'https://github.com/rochwu';
};

export const DodgingButton: VFC = () => {
  const gps = useGps();
  const ref = useButtonRef();
  const [style, setStyle] = useState<CSSProperties>(initialStyle);

  const isBreaking = useRecoilValue(isButtonBreaking);
  const setAttempts = useSetRecoilState(attemptsState);
  const setBreakPosition = useSetRecoilState(breakPositionState);

  const dodge: MouseEventHandler = () => {
    if (isBreaking) {
      const position = gps.get('button');
      setBreakPosition({top: position.top, left: position.left});
    }

    const {top, left} = newPosition(gps.get('main'), gps.get('button'));

    gps.set('button', {top, left});

    // TODO: Maybe transition
    setStyle({display: 'none'});
    setTimeout(() => {
      setStyle({top: `${top}%`, left: `${left}%`});
    }, 333);

    // This has to be here to create the break away effect
    // or else it'll flash back to life and look wonk
    setAttempts((previous) => previous + 1);
  };

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
