import {VFC} from 'react';
import styled from '@emotion/styled';

import {Text} from './Text';

const Container = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
});

// TODO: Maybe display options here
export const Be: VFC = () => {
  return (
    <Container>
      <Text />
    </Container>
  );
};
