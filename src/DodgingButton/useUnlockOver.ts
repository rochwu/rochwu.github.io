import {useRef} from 'react';
import {useSetRecoilState} from 'recoil';

import {setUnlockState} from '../state';

// This effect is not important enough to cause a component render
export const useUnlockOver = () => {
  const entered = useRef(false);
  const overed = useRef(false);

  const unlock = useSetRecoilState(setUnlockState);

  if (overed.current) {
    return {};
  }

  return {
    enter() {
      entered.current = true;
    },
    leave() {
      entered.current = false;
    },
    over() {
      // Same render cycle overed can be false
      if (entered.current || overed.current) {
        return;
      }

      overed.current = true;
      unlock('mouseOver');
    },
  };
};
