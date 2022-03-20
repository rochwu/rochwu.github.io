import {VFC} from 'react';
import {useRecoilValue} from 'recoil';

import {
  isIncrementalGameState,
  attemptsState,
  starsFelledState,
} from '../state';

import {TauntsHandler} from './TauntsHandler';
import {CommentaryHandler} from './CommentaryHandler';
import {TitleHandler} from './TitleHandler';

export const AppLoop: VFC = () => {
  const isIncrementalGame = useRecoilValue(isIncrementalGameState);
  const attempts = useRecoilValue(attemptsState);
  const starsFelled = useRecoilValue(starsFelledState);

  const props = {
    attempts,
    starsFelled,
  };

  return (
    <>
      {isIncrementalGame && <TauntsHandler {...props} />}
      <CommentaryHandler {...props} />
      <TitleHandler {...props} />
    </>
  );
};
