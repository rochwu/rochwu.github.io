import {VFC} from 'react';
import styled from '@emotion/styled';

import {Commentary} from '../Commentary';
import {IncrementalGame} from '../IncrementalGame';

const Container = styled.div({
  display: 'flex',
});

export const Header: VFC = () => {
  return (
    <Container aria-hidden>
      <IncrementalGame />
      <Commentary />
    </Container>
  );
};
