import styled from '@emotion/styled';
import {HTMLAttributes, VFC} from 'react';

import {blendHex} from '../blendHex';
import {APP, TEXT} from '../constants';

import {sliderWidth} from './dimensions';
import {WaveBar} from './WaveBar';

const backgroundColor = blendHex(APP.BACK_COLOR, TEXT.COLOR);

const Container = styled.div({
  position: 'absolute',
  height: '100%',
  width: sliderWidth,
  transform: `translateX(-50%)`,
  cursor: 'grab',
  ':active': {
    cursor: 'grabbing',
  },
  ':hover': {
    opacity: '25%',
    backgroundColor,
    borderRadius: sliderWidth,
  },
  touchAction: 'none', // use-gesture was complaining
  boxSizing: 'border-box',
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
