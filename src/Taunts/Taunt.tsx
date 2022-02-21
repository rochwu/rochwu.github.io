import {VFC} from 'react';
import styled from '@emotion/styled';
import {animated, useSpring} from 'react-spring';

import {Metadata} from '../types';
import {MILESTONES, TEXT} from '../constants';

const FONT_SIZE = '0.5em';

const Container = styled(animated.span)({
  position: 'absolute',
  userSelect: 'none',
  fontSize: FONT_SIZE,
  color: TEXT.COLOR,
});

export type TauntProps = Pick<Metadata, 'top' | 'left'> & {
  insult: string;
  birthday: number;
  attempts: number;
};

const range = [0, 0.1, 1];
const output = [1, 1.5, 1];

export const Taunt: VFC<TauntProps> = ({
  top,
  left,
  insult,
  birthday,
  attempts,
}) => {
  const age = 100 - ((attempts - birthday) / MILESTONES.MAX_TAUNT_AGE) * 100;

  const {explode, ...style} = useSpring({
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(1em, -2em)`,
    opacity: `${age}%`,
    from: {explode: 0},
    explode: 1,
    config: {
      duration: 300,
    },
  });

  return (
    <Container style={{...style, scale: explode.to({range, output})}}>
      {insult}
    </Container>
  );
};
