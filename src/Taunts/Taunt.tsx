import {VFC} from 'react';
import styled from '@emotion/styled';

import {Metadata} from '../types';

import {MAX_AGE} from './insults';

const FONT_SIZE = '0.5em';

const Container = styled.div({
  position: 'absolute',
  userSelect: 'none',
  fontSize: FONT_SIZE,
});

export type TauntProps = Pick<Metadata, 'top' | 'left'> & {
  insult: string;
  birthday: number;
  attempts: number;
};

export const Taunt: VFC<TauntProps> = ({
  top,
  left,
  insult,
  birthday,
  attempts,
}) => {
  const age = 100 - ((attempts - birthday) / MAX_AGE) * 100;

  return (
    <Container
      style={{
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(1em, -2em)`,
        opacity: `${age}%`,
      }}
    >
      {insult}
    </Container>
  );
};
