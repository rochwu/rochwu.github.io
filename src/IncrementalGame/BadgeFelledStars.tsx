import {VFC} from 'react';
import {useRecoilValue} from 'recoil';

import {starsFelledState} from '../state';
import {APP} from '../constants';

import {Badge} from './Badge';

export const BadgeFelledStars: VFC = () => {
  const score = useRecoilValue(starsFelledState);

  return (
    <Badge
      backgroundColor={`#A57EA4`}
      color={APP.BACK_COLOR}
      isVisible={score > 0}
    >
      -{score}
    </Badge>
  );
};
