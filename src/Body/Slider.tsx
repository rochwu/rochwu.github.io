import styled from '@emotion/styled';
import {HTMLAttributes, VFC} from 'react';

import {sliderWidth} from './dimensions';
import {WaveBar} from './WaveBar';

const Container = styled.div({
  position: 'absolute',
  height: '100%',
  width: sliderWidth,
  transform: `translateX(-50%)`,
  cursor: 'grab',
  ':active': {
    cursor: 'grabbing',
  },
  touchAction: 'none', // use-gesture was complaining
});

type Props = HTMLAttributes<HTMLDivElement> & {atPercent: number};

export const Slider: VFC<Props> = ({atPercent, ...props}) => {
  const isCorner = atPercent === 0;

  return (
    <Container aria-hidden style={{left: `${atPercent}%`}} {...props}>
      {isCorner && <WaveBar />}
    </Container>
  );
};
