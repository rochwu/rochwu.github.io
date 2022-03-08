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
import {useSynced} from '../SyncedContext';
import {
  attemptsState,
  breakPositionState,
  isButtonBreaking,
  setUnlockState,
} from '../state';
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
  const hasEntered = useRef(false);
  const hasOvered = useRef(false);
  const hasFocused = useRef(false);

  const isBreaking = useRecoilValue(isButtonBreaking);
  const setAttempts = useSetRecoilState(attemptsState);
  const setBreakPosition = useSetRecoilState(breakPositionState);
  const unlock = useSetRecoilState(setUnlockState);

  const dodge: MouseEventHandler = () => {
    hasEntered.current = true;

    if (isBreaking) {
      const position = gps.get('button');
      setBreakPosition({top: position.top, left: position.left});
    }

    const {top, left} = newPosition(gps.get('main'), gps.get('button'));

    gps.set('button', {top, left});

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

  const onFocus = hasFocused.current
    ? undefined
    : () => {
        if (hasFocused.current) {
          return;
        }

        hasFocused.current = true;
        unlock('keyboardFocus');
      };

  return (
    <Button
      aria-label="Link to my github at github.com/rochwu"
      ref={ref}
      style={style}
      onClick={goToGithub}
      onFocus={onFocus}
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
