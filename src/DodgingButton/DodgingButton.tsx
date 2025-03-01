import {CSSProperties, FC, MouseEventHandler, useState, VFC} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';

import {useGps} from '../GpsContext';
import {useAll, useSchedule} from '../SyncedContext';
import {attemptsState, breakPositionState, isButtonBreaking} from '../state';
import {useMutex} from '../useMutex';

import {useButtonRef} from './useButtonRef';
import {initialStyle} from './initialStyle';
import {HidableText} from './HidableText';
import {Button} from './Button';
import {useFocus} from './useFocus';
import {newPosition} from './newPosition';
import {useUnlockOver} from './useUnlockOver';
import {goToGitHub} from '../goToGitHub';

const PositionedButton: FC = ({children}) => {
  const gps = useGps();
  const ref = useButtonRef();
  const schedule = useSchedule();
  const {focus, unfocus, style: focusStyle} = useFocus();
  const {enter, leave, over} = useUnlockOver();

  // TODO: this order matters, the -1 tabIndex is sent to day
  // Ideally we'd see whether we're visible or not
  const tabIndex = useMutex('button', undefined, -1);

  const [style, setStyle] = useState<CSSProperties>(initialStyle);

  const isBreaking = useRecoilValue(isButtonBreaking);
  const setAttempts = useSetRecoilState(attemptsState);
  const setBreakPosition = useSetRecoilState(breakPositionState);

  const move = useAll(
    (top: number, left: number) => {
      setStyle({top: `${top}%`, left: `${left}%`});
    },
    {id: 'move'},
  );

  const disappear = useAll(
    () => {
      setStyle({display: 'none'});
    },
    {id: 'disappear'},
  );

  const dodge: MouseEventHandler = () => {
    enter?.();

    if (isBreaking) {
      const position = gps.get('button');
      setBreakPosition({top: position.top, left: position.left});
    }

    const {top, left} = newPosition(gps.get('main'), gps.get('button'));

    gps.set('button', {top, left});

    disappear();
    schedule(() => {
      move(top, left);
    });

    // At the end to prevent a flash when the button goes away
    setAttempts((previous) => previous + 1);
  };

  // TODO: tabIndex for the hidden button
  return (
    <Button
      aria-label="Link to my github at github.com/rochwu"
      ref={ref}
      style={{...style, ...focusStyle}}
      tabIndex={tabIndex}
      onBlur={unfocus}
      onClick={goToGitHub}
      onFocus={focus}
      onMouseEnter={dodge}
      onMouseLeave={leave}
      onMouseOver={over}
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
