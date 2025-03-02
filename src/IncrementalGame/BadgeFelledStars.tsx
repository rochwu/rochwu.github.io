import {useEffect} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';

import {setUnlockState, starsFelledState} from '../state';
import {BADGE} from '../constants';

import {Badge} from './Badge';

export const BadgeFelledStars = () => {
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
      backgroundColor={BADGE.INVERSE.BACK_COLOR}
      color={BADGE.INVERSE.COLOR}
      isVisible={isVisible}
    >
      -{score}
    </Badge>
  );
};
