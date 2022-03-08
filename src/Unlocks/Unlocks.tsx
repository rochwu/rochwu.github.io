import styled from '@emotion/styled';
import {useEffect, useState, VFC} from 'react';
import {animated, useSpring} from 'react-spring';
import {useRecoilValue} from 'recoil';

import {getUnlocksState, UNLOCKS_MAX, useClearUnlocks} from '../state';

const Container = styled(animated.div)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  bottom: '4px',
  right: '4px',
  width: '60px', // Size of "clear?"
  padding: '4px',
  ':hover': {
    cursor: 'pointer',
  },
});

const Count = styled(animated.div)({});
const Clear = styled(animated.div)({});

const flipStyle = (flipped: boolean) => {
  const inverse = flipped
    ? {
        display: 'none',
        opacity: 0,
        transform: `perspective(600px) rotateX(180deg)`,
      }
    : {
        display: 'initial',
        opacity: 1,
        transform: `perspective(600px) rotateX(0deg)`,
      };

  return {
    ...inverse,
    config: {mass: 5, tension: 500, friction: 80, duration: 333},
  };
};

export const Unlocks: VFC = () => {
  const count = useRecoilValue(getUnlocksState);
  const hasUnlocks = count > 0;

  const [flipped, setFlipped] = useState(false);
  const [clearText, setClearText] = useState('clear?');

  const clearUnlocks = useClearUnlocks();

  const countStyle = useSpring(flipStyle(flipped));
  const clearStyle = useSpring(flipStyle(!flipped));

  const [mountStyle] = useSpring(() => ({
    from: {opacity: 0},
    opacity: 1,
  }));

  useEffect(() => {
    setClearText(hasUnlocks ? 'clear?' : 'later?');
    // Change only on flip to hide transition while hovered
  }, [flipped]);

  const flip = () => {
    setFlipped((previous) => !previous);
  };

  const handleClick = () => {
    if (flipped) {
      clearUnlocks();
    }
  };

  return (
    <Container
      aria-hidden
      style={mountStyle}
      onClick={handleClick}
      onMouseEnter={flip}
      onMouseLeave={flip}
    >
      <Count style={countStyle}>{`${count}/${UNLOCKS_MAX}`}</Count>
      <Clear style={clearStyle}>{clearText}</Clear>
    </Container>
  );
};
