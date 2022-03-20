import {CSSProperties, useState, VFC} from 'react';
import styled from '@emotion/styled';

import {radialGradients} from './radialGradients';

const Container = styled.div({
  display: 'flex',
  fontSize: '2em',
  color: 'transparent',
});

// Safari won't work without it on the leaf elements
const Be = styled.div({
  position: 'relative',
  backgroundClip: 'text',
  backgroundImage: radialGradients([
    '10% 90%, #ef7b75',
    '88% 10%, #f6b993',
    '0% 22%, #658ff0',
  ]),
  ':after': {
    content: '"be"',
  },
});

const What = styled.div({
  position: 'relative',
  backgroundClip: 'text',
  backgroundImage: radialGradients([
    '88% 12%, #86e1a2',
    '23% 77%, #da5b55',
    '43% 57%, #ff5c30',
    '67% 90%, #2c79ff',
    '33% 10%, #fe56fb',
  ]),
  margin: '0 0.23em',
  ':after': {
    content: '"what?"',
  },
});

const HoverOverlay = styled.div({
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
  transform: 'scale(1.25)',
});

export const Text: VFC = () => {
  const [visibility, setVisibility] = useState<CSSProperties['visibility']>(
    'hidden',
  );

  const enter = () => {
    setVisibility('visible');
  };

  const leave = () => {
    setVisibility('hidden');
  };

  return (
    <Container>
      <Be style={{visibility}}>
        <HoverOverlay onMouseEnter={enter} onMouseLeave={leave} />
      </Be>
      <What>
        <HoverOverlay onMouseEnter={enter} onMouseLeave={leave} />
      </What>
      <Be style={{visibility: 'hidden'}} />
    </Container>
  );
};
