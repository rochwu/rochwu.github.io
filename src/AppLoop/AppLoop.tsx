import {VFC} from 'react';
import {useRecoilValue} from 'recoil';

import {
  isIncrementalGameState,
  attemptsState,
  starsFelledState,
} from '../state';

import {TauntsHandler} from './TauntsHandler';
import {CommentaryHandler} from './CommentaryHandler';

export const AppLoop: VFC = () => {
  const isIncrementalGame = useRecoilValue(isIncrementalGameState);
  const attempts = useRecoilValue(attemptsState);
  const starsFelled = useRecoilValue(starsFelledState);

  return (
    <>
      {isIncrementalGame && (
        <TauntsHandler attempts={attempts} starsFelled={starsFelled} />
      )}
      <CommentaryHandler attempts={attempts} starsFelled={starsFelled} />
    </>
  );
};
