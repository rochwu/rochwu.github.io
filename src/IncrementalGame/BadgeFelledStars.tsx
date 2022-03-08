import {useEffect, VFC} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';

import {setUnlockState, starsFelledState} from '../state';
import {APP} from '../constants';

import {Badge} from './Badge';

export const BadgeFelledStars: VFC = () => {
  const score = useRecoilValue(starsFelledState);
  const unlock = useSetRecoilState(setUnlockState);

  const isVisible = score > 0;

  useEffect(() => {
    if (isVisible) {
      unlock('starFall');
    }
  }, [isVisible, unlock]);

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
