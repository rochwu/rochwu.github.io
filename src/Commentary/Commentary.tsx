import styled from '@emotion/styled';
import {useRecoilValue} from 'recoil';

import {attemptsState, MILESTONES} from '../state';
import {isTouchDevice} from '../isTouchDevice';
import {useRef} from 'react';

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
  const onBreak = useRef(0);

  let comment = 'sup check out the horrible stuff I built down below';

  if (isTouchDevice()) {
    comment = `whoops don't think it'd work on a touch device`;
  } else if (attempts > MILESTONES.INCREMENTAL_ON * 8) {
    comment = `remember you came here for a github link?`;
  } else if (attempts > MILESTONES.INCREMENTAL_ON * 4) {
    comment = `TODO: better dialogue, take a writing class`;
  } else if (attempts > MILESTONES.INCREMENTAL_ON * 2) {
    comment = `got ${attempts}, not bad`;
  } else if (attempts > MILESTONES.INCREMENTAL_ON) {
    comment = `it's a game!`;
  } else if (attempts === MILESTONES.INCREMENTAL_ON) {
    comment = 'wait--';
  } else if (attempts > MILESTONES.BREAK) {
    if (onBreak.current === 0) {
      comment = 'hold on-- aiya...';
    } else {
      comment = `oh dear..${'.'.repeat(onBreak.current)}`;
    }
    onBreak.current += 1;
  } else if (attempts > 1) {
    comment = `and it's gone!`;
  } else if (attempts >= 1) {
    comment = 'oi where is it going?';
  }

  // Accessible users get no sass from me
  return (
    <Container aria-hidden>
      <Comment>{comment}</Comment>
    </Container>
  );
};
