import {VFC} from 'react';
import styled from '@emotion/styled';

import {Commentary} from '../Commentary';
import {BadgeScore, BadgeStarfalls} from '../IncrementalGame';

const Container = styled.div({
  display: 'flex',
});

export const Header: VFC = () => {
  return (
    <Container aria-hidden>
      <BadgeScore />
      <Commentary />
      <BadgeStarfalls />
    </Container>
  );
};
