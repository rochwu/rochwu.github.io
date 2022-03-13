import styled from '@emotion/styled';
import {useRecoilValue} from 'recoil';

import {commentaryState} from '../state';

const Container = styled.div({
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'end',
  width: '100%',
});

const Comment = styled.span({
  fontSize: '1.5em',
  fontWeight: 'bold',
});

export const Commentary = () => {
  const comment = useRecoilValue(commentaryState);

  return (
    <Container>
      <Comment>{comment}</Comment>
    </Container>
  );
};
