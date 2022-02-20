import {VFC} from 'react';
import styled from '@emotion/styled';
import {useRecoilValue} from 'recoil';

import {attemptsState, isIncrementalGameState} from '../state';
import {BADGE} from '../constants';

const FONT_SIZE = '1em';

const Container = styled.div<{isVisible: boolean}>(
  ({isVisible}) => ({visibility: isVisible ? 'visible' : 'hidden'}),
  {
    minHeight: BADGE.SIZE,
    minWidth: BADGE.SIZE,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    userSelect: 'none',
  },
);

const Span = styled.span({
  backgroundColor: BADGE.COLOR,
  color: 'white',
  borderRadius: '13px',
  padding: '2px 8px',
  fontSize: FONT_SIZE,
});

const Score: VFC = () => {
  const score = useRecoilValue(attemptsState);

  return <Span>{score}</Span>;
};

export const BadgeScore: VFC = () => {
  const isOn = useRecoilValue(isIncrementalGameState);

  return (
    <Container isVisible={isOn}>
      <Score />
    </Container>
  );
};
