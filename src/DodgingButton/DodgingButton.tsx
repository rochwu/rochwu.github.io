import {CSSProperties, FC, useState, VFC} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';

import {useGps} from '../GpsContext';
import {useSynced} from '../SyncedContext';
import {attemptsState, breakPositionState, isButtonBreaking} from '../state';
import {newPosition} from '../newPosition';

import {useButtonRef} from './useButtonRef';
import {initialStyle} from './initialStyle';
import {HidableText} from './HidableText';
import {Button} from './Button';

const goToGithub = () => {
  window.location.href = 'https://github.com/rochwu';
};

const PositionedButton: FC = ({children}) => {
  const gps = useGps();
  const ref = useButtonRef();
  const schedule = useSynced();

  const [style, setStyle] = useState<CSSProperties>(initialStyle);

  const isBreaking = useRecoilValue(isButtonBreaking);
  const setAttempts = useSetRecoilState(attemptsState);
  const setBreakPosition = useSetRecoilState(breakPositionState);

  const dodge = () => {
    if (isBreaking) {
      const position = gps.get('button');
      setBreakPosition({top: position.top, left: position.left});
    }

    const {top, left} = newPosition(gps.get('main'), gps.get('button'));

    gps.set('button', {top, left});

    // TODO: Maybe transition
    setStyle({display: 'none'});
    schedule(
      () => {
        setStyle({top: `${top}%`, left: `${left}%`});
      },
      {override: true},
    );

    // At the end to prevent a flash when the button goes away
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
      {children}
    </Button>
  );
};

export const DodgingButton: VFC = () => {
  // PositionedButton renders a lot, we use children to minimize HidableText renders
  return (
    <PositionedButton>
      <HidableText />
    </PositionedButton>
  );
};
