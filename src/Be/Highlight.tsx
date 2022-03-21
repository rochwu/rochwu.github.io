import styled from '@emotion/styled';
import {VFC} from 'react';

import {radialGradients} from './radialGradients';

const Container = styled.div({
  position: 'absolute',
  top: 0,
  left: '-47px',
});

const Be = styled.div({
  display: 'flex',
  color: 'transparent',
  backgroundClip: 'text',
  backgroundImage: radialGradients([
    '10% 90%, #8ea0ce',
    '88% 10%, #c3d8e6',
    '0% 22%, #25e99e',
  ]),
  ':before': {
    content: '"be"',
  },
});

export const Highlight: VFC = () => {
  return (
    <Container>
      <Be />
    </Container>
  );
};
