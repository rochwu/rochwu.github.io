import {VFC} from 'react';
import styled from '@emotion/styled';

import {Header} from '../Header';
import {Main} from '../Main';
import {APP} from '../constants';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: APP.BACK_COLOR,
  margin: 'auto',
  maxWidth: `${APP.WIDTH}px`,
  height: '100%',
});

export const Content: VFC = () => {
  return (
    <Container>
      <Header />
      <Main />
    </Container>
  );
};
