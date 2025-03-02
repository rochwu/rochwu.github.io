import styled from '@emotion/styled';

import {radialGradients} from './radialGradients';

const Container = styled.div({
  position: 'absolute',
  top: 0,
  left: '-47px',
});

const Be = styled.div({
  color: 'transparent',
  backgroundClip: 'text',
  backgroundColor: '#51def0',
  backgroundImage: radialGradients([
    '10% 90%, #8ea0ce',
    '88% 10%, #c3d8e6',
    '0% 22%, #25e99e',
  ]),
  ':before': {
    content: '"be"',
  },
});

export const Highlight = () => {
  return (
    <Container>
      <Be />
    </Container>
  );
};
