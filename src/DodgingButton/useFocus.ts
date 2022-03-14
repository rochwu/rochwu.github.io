import {CSSProperties, useState} from 'react';
import {useSetRecoilState} from 'recoil';

import {useAll} from '../SyncedContext';
import {setUnlockState} from '../state';

import {useTheme} from '@emotion/react';

const initialFocusStyle = {};

export const useFocus = () => {
  const [style, setStyle] = useState<CSSProperties>(initialFocusStyle);

  const {button: buttonColor} = useTheme();

  const unlock = useSetRecoilState(setUnlockState);

  // Focus is done inline so both buttons can receive button at the same time
  const focus = useAll(
    () => {
      setStyle({
        outline: `3px double ${buttonColor}`,
        outlineOffset: '1px',
      });
      unlock('keyboardFocus');
    },
    {id: 'focus'},
  );

  const unfocus = useAll(
    () => {
      setStyle(initialFocusStyle);
    },
    {id: 'unfocus'},
  );

  return {focus, unfocus, style};
};
