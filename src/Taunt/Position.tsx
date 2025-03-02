import styled from '@emotion/styled';
import {ReactNode} from 'react';

import {TauntProps} from './types';

const Container = styled.div({
  position: 'absolute',
  transform: 'translate(0.5em, -1em)',
});

export const Position = ({
  top,
  left,
  children,
}: Pick<TauntProps, 'top' | 'left'> & {children: ReactNode}) => {
  return (
    <Container style={{top: `${top}%`, left: `${left}%`}}>{children}</Container>
  );
};
