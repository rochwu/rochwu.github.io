import {useEffect} from 'react';
import {useSetRecoilState} from 'recoil';

import {commentaryState} from '../state';

import {LoopProps} from './types';
import {comment} from './comment';

export const CommentaryHandler = (props: LoopProps) => {
  const {attempts} = props;
  const setCommentary = useSetRecoilState(commentaryState);

  useEffect(() => {
    const commentary = comment(props);

    setCommentary(commentary);
  }, [attempts]);

  return null;
};
