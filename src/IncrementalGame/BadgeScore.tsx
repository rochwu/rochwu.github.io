import {VFC} from 'react';
import {useRecoilValue} from 'recoil';

import {attemptsState, isIncrementalGameState} from '../state';
import {BADGE} from '../constants';

import {Badge} from './Badge';

export const BadgeScore: VFC = () => {
  const isOn = useRecoilValue(isIncrementalGameState);
  const score = useRecoilValue(attemptsState);

  return (
    <Badge
      backgroundColor={BADGE.BACK_COLOR}
      color={BADGE.COLOR}
      isVisible={isOn}
    >
      {score}
    </Badge>
  );
};
