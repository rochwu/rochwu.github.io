import {useEffect, VFC} from 'react';
import {useSetRecoilState} from 'recoil';
import {commentaryState} from '../state';
import {SystemProps} from './types';

import {comment} from './comment';

export const CommentaryHandler: VFC<SystemProps> = (props) => {
  const {attempts} = props;
  const setCommentary = useSetRecoilState(commentaryState);

  useEffect(() => {
    setCommentary(comment(props));
  }, [attempts]);

  return null;
};
