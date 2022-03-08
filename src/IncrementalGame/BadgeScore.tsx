import {useLayoutEffect, VFC} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';

import {attemptsState, isIncrementalGameState, setUnlockState} from '../state';
import {BADGE} from '../constants';

import {Badge} from './Badge';

export const BadgeScore: VFC = () => {
  const isVisible = useRecoilValue(isIncrementalGameState);
  const score = useRecoilValue(attemptsState);
  const unlock = useSetRecoilState(setUnlockState);

  useLayoutEffect(() => {
    if (isVisible) {
      unlock('incremental');
    }
    // eslint-disable-next-line
  }, [isVisible]);

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
