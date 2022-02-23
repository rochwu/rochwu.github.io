import {VFC} from 'react';
import styled from '@emotion/styled';

import {useSpring, animated} from 'react-spring';

import {Header} from '../Header';
import {Main} from '../Main';
import {APP} from '../constants';

const Container = styled(animated.div)({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: APP.BACK_COLOR,
  margin: 'auto',
  maxWidth: '1024px', // Arbitrary, iPad
  height: '100%',
});

export const Content: VFC = () => {
  const [style] = useSpring(() => ({
    from: {opacity: '0'},
    opacity: '100%',
    config: {duration: 333},
  }));

  return (
    <Container style={style}>
      <Header />
      <Main />
    </Container>
  );
};
