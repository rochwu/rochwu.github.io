import {useEffect} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';

import {attemptsState, isIncrementalGameState, setUnlockState} from '../state';
import {BADGE} from '../constants';

import {Badge} from './Badge';

export const BadgeScore = () => {
  const isVisible = useRecoilValue(isIncrementalGameState);
  const score = useRecoilValue(attemptsState);
  const unlock = useSetRecoilState(setUnlockState);

  useEffect(() => {
    if (isVisible) {
      unlock('incremental');
    }
  }, [isVisible, unlock]);

  return (
    <Badge
      backgroundColor={BADGE.BACK_COLOR}
      color={BADGE.COLOR}
      isVisible={isVisible}
    >
      {score}
    </Badge>
  );
};
