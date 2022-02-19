import styled from '@emotion/styled';

import {useComment} from './useComment';

const Container = styled.div({
  display: 'flex',
  justifyContent: 'center',
  position: 'relative',
  top: '1%',
  zIndex: -1,
});

const Comment = styled.span({
  fontSize: '1.5em',
  fontWeight: 'bold',
});

export const Commentary = () => {
  const comment = useComment();

  return (
    <Container aria-hidden>
      <Comment>{comment}</Comment>
    </Container>
  );
};
