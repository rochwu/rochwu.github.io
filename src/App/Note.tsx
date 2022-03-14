import {VFC} from 'react';
import styled from '@emotion/styled';

import {TEXT} from '../constants';
import {ResponsiveLevel, useResponsiveLevel} from '../ResponsiveContext';

const Container = styled.div({
  position: 'absolute',
  color: TEXT.COLOR,
  fontFamily: `'Source Code Pro', 'Andale Mono', monospace`,
  textTransform: 'uppercase',
  fontSize: '0.75em',
  left: '2px',
});

export const Note: VFC = () => {
  const level = useResponsiveLevel();

  const note =
    level === ResponsiveLevel.Small
      ? 'By Rolando Wu'
      : 'Assembled haphazardly by Rolando Wu';

  return <Container role="note">{note}</Container>;
};
