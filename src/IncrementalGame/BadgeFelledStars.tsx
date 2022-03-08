import {useLayoutEffect, VFC} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';

import {setUnlockState, starsFelledState} from '../state';
import {APP} from '../constants';

import {Badge} from './Badge';

export const BadgeFelledStars: VFC = () => {
  const score = useRecoilValue(starsFelledState);
  const unlock = useSetRecoilState(setUnlockState);

  const isVisible = score > 0;

  useLayoutEffect(() => {
    if (isVisible) {
      unlock('starFall');
    }
    // eslint-disable-next-line
  }, [isVisible]);

  return (
    <Badge
      backgroundColor={`#A57EA4`}
      color={APP.BACK_COLOR}
      isVisible={isVisible}
    >
      -{score}
    </Badge>
  );
};
