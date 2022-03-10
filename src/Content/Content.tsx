import {VFC} from 'react';
import styled from '@emotion/styled';

import {Header} from '../Header';
import {Main} from '../Main';
import {APP} from '../constants';

const Container = styled.div(
  {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    maxWidth: `${APP.WIDTH}px`,
    height: '100%',
  },
  ({theme}) => ({
    color: theme.text,
    backgroundColor: theme.app,
  }),
);

export const Content: VFC = () => {
  return (
    <Container>
      <Header />
      <Main />
    </Container>
  );
};
