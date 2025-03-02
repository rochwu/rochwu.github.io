import styled from '@emotion/styled';

import {Options} from './Options';
import {DuckProvider} from './duck';

const Container = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  fontSize: '2em',
});

// TODO: Maybe display options here
export const Be = () => {
  return (
    <DuckProvider>
      <Container>
        <Options />
      </Container>
    </DuckProvider>
  );
};
