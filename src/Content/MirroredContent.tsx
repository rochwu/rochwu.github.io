import {VFC, HTMLAttributes} from 'react';
import styled from '@emotion/styled';

import {Header} from '../Header';
import {Main} from '../Main';

import {sliderWidth} from './dimensions';

const Container = styled.div(
  {
    display: 'flex', // Constrains height, don't remove it again...
    flexDirection: 'column',
    position: 'absolute',
    height: '100%',
    transform: `translateX(${sliderWidth / 2}px)`, // Basically centering
  },
  ({theme}) => ({
    color: theme.text,
    backgroundColor: theme.app,
  }),
);

export const MirroredContent: VFC<HTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <Container {...props}>
      <Header />
      <Main />
    </Container>
  );
};
