import styled from '@emotion/styled';
import {useRecoilValue} from 'recoil';

import {attemptsState, isButtonBroken} from '../state';
import {isTouchDevice} from '../isTouchDevice';

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
  const attempts = useRecoilValue(attemptsState);
  const isBroken = useRecoilValue(isButtonBroken);

  let comment = 'sup check out my projects down below';

  if (isBroken) {
    comment = 'aiya oh dear...';
  } else if (attempts >= 1) {
    comment = 'oi where is it going!';
  }

  if (isTouchDevice()) {
    comment = `whoops don't think it'd work on a touch device`;
  }

  // Accessible users get no sass from me
  return (
    <Container aria-hidden>
      <Comment>{comment}</Comment>
    </Container>
  );
};
