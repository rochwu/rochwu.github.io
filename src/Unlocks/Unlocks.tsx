import styled from '@emotion/styled';
import {VFC} from 'react';
import {animated, useSpring} from 'react-spring';
import {useRecoilValue} from 'recoil';

import {getUnlocksState, UNLOCKS_MAX} from '../state';

const Container = styled(animated.div)({
  display: 'flex',
  position: 'absolute',
  bottom: '4px',
  right: '4px',
});

const Counter: VFC<{count: number}> = ({count}) => {
  const [style] = useSpring(() => ({
    from: {opacity: 0},
    opacity: 1,
  }));

  return <Container style={style}>{`${count}/${UNLOCKS_MAX}`}</Container>;
};

export const Unlocks: VFC = () => {
  const unlocks = useRecoilValue(getUnlocksState);

  if (unlocks === 0) {
    return null;
  }

  return <Counter count={unlocks} />;
};
