import styled from '@emotion/styled';
import {FC} from 'react';

import {TauntProps} from './types';

const Container = styled.div({
  position: 'absolute',
  width: '100%',
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
