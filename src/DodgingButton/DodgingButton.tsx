import {
  CSSProperties,
  FC,
  MouseEventHandler,
  useRef,
  useState,
  VFC,
} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';

import {useGps} from '../GpsContext';
import {useAll, useSynced} from '../SyncedContext';
import {
  attemptsState,
  breakPositionState,
  isButtonBreaking,
  setUnlockState,
} from '../state';
import {useMutex} from '../useMutex';

import {useButtonRef} from './useButtonRef';
import {initialStyle} from './initialStyle';
import {HidableText} from './HidableText';
import {Button} from './Button';
import {useFocus} from './useFocus';
import {newPosition} from './newPosition';

const goToGithub = () => {
  window.location.href = 'https://github.com/rochwu';
};

const PositionedButton: FC = ({children}) => {
  const gps = useGps();
  const ref = useButtonRef();
  const schedule = useSynced();
  const {focus, unfocus, style: focusStyle} = useFocus();
  // TODO: this order matters, the -1 tabIndex is sent to day
  // Ideally we'd see whether we're visible or not
  const tabIndex = useMutex('button', undefined, -1);

  const [style, setStyle] = useState<CSSProperties>(initialStyle);
  const hasEntered = useRef(false);
  const hasOvered = useRef(false);

  const isBreaking = useRecoilValue(isButtonBreaking);
  const setAttempts = useSetRecoilState(attemptsState);
  const setBreakPosition = useSetRecoilState(breakPositionState);
  const unlock = useSetRecoilState(setUnlockState);

  const move = useAll(
    (top, left) => {
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

  const entered = useAll(
    () => {
      hasEntered.current = true;
    },
    {id: 'entered'},
  );

  const dodge: MouseEventHandler = () => {
    entered();

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

  const overHandlers = hasOvered.current
    ? undefined
    : {
        onMouseLeave: () => {
          hasEntered.current = false;
        },
        onMouseOver: () => {
          // Without rerender the functions are in closure, we check over
          if (hasEntered.current || hasOvered.current) {
            return;
          }

          hasOvered.current = true;

          unlock('mouseOver');
        },
      };

  // TODO: tabIndex for the hidden button
  return (
    <Button
      aria-label="Link to my github at github.com/rochwu"
      ref={ref}
      style={{...style, ...focusStyle}}
      tabIndex={tabIndex}
      onBlur={unfocus}
      onClick={goToGithub}
      onFocus={focus}
      onMouseEnter={dodge}
      {...overHandlers}
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
