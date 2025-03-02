import {HTMLAttributes} from 'react';
import styled from '@emotion/styled';

import {Header} from './Header';
import {Main} from './Main';

const Container = styled.div(
  {
    display: 'flex', // Constrains height, don't remove it again...
    flexDirection: 'column',
    position: 'absolute',
    height: '100%',
  },
  ({theme}) => ({
    color: theme.text,
    backgroundColor: theme.app,
  }),
);

export const Content = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <Container {...props}>
      <Header />
      <Main />
    </Container>
  );
};
