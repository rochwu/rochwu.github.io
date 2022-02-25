import styled from '@emotion/styled';

import {TEXT} from '../constants';

import {useComment} from './useComment';

const Container = styled.div({
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'end',
  width: '100%',
});

const Comment = styled.span({
  fontSize: '1.5em',
  fontWeight: 'bold',
  color: TEXT.COLOR,
});

export const Commentary = () => {
  const comment = useComment();

  return (
    <Container>
      <Comment>{comment}</Comment>
    </Container>
  );
};
