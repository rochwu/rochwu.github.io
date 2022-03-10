import styled from '@emotion/styled';
import {FC} from 'react';

import {TauntProps} from './types';

const Container = styled.div({
  position: 'absolute',
  transform: 'translate(0.5em, -1em)',
});

export const Position: FC<Pick<TauntProps, 'top' | 'left'>> = ({
  top,
  left,
  children,
}) => {
  return (
    <Container style={{top: `${top}%`, left: `${left}%`}}>{children}</Container>
  );
};
