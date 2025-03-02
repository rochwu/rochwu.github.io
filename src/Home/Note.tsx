import styled from '@emotion/styled';

import {ResponsiveLevel, useResponsiveLevel} from '../ResponsiveContext';

const Container = styled.div({
  position: 'absolute',
  fontFamily: `'Source Code Pro', 'Andale Mono', monospace`,
  textTransform: 'uppercase',
  fontSize: '0.75em',
  left: '2px',
});

export const Note = () => {
  const level = useResponsiveLevel();

  const note =
    level === ResponsiveLevel.Small
      ? 'By Rolando Wu'
      : 'Assembled haphazardly by Rolando Wu';

  return <Container role="note">{note}</Container>;
};
