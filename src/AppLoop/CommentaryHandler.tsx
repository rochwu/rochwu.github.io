import {useEffect, VFC} from 'react';
import {useSetRecoilState} from 'recoil';

import {commentaryState} from '../state';

import {LoopProps} from './types';
import {comment} from './comment';

export const CommentaryHandler: VFC<LoopProps> = (props) => {
  const {attempts} = props;
  const setCommentary = useSetRecoilState(commentaryState);

  useEffect(() => {
    setCommentary(comment(props));
  }, [attempts]);

  return null;
};
