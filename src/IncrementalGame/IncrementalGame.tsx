import {VFC} from 'react';
import styled from '@emotion/styled';
import {useRecoilValue} from 'recoil';

import {attemptsState, isIncrementalGameState} from '../state';

const FONT_SIZE = '1em';

// TODO: Seriously, aren't we making too many absolute
const Container = styled.div({
  position: 'absolute',
  top: FONT_SIZE,
  left: FONT_SIZE,
});

const Span = styled.span({
  backgroundColor: '#D0342C',
  color: 'white',
  borderRadius: '13px',
  padding: '2px 8px',
  fontSize: FONT_SIZE,
});

const Score: VFC = () => {
  const score = useRecoilValue(attemptsState);

  return <Span>{score}</Span>;
};

export const IncrementalGame: VFC = () => {
  const isOn = useRecoilValue(isIncrementalGameState);

  if (!isOn) {
    return null;
  }

  return (
    <Container aria-hidden>
      <Score />
    </Container>
  );
};
