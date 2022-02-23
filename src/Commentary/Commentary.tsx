import styled from '@emotion/styled';

import {BADGE, TEXT} from '../constants';
import {useResponsiveLevel, ResponsiveLevel} from '../ResponsiveContext';

import {useComment} from './useComment';

const Container = styled.div<{responsiveLevel: ResponsiveLevel}>(
  ({responsiveLevel}) => {
    if (responsiveLevel === ResponsiveLevel.Small) {
      return;
    }

    return {
      marginRight: BADGE.SIZE,
    };
  },
  {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'end',
    width: '100%',
  },
);

const Comment = styled.span({
  fontSize: '1.5em',
  fontWeight: 'bold',
  color: TEXT.COLOR,
});

export const Commentary = () => {
  const comment = useComment();

  const level = useResponsiveLevel();

  return (
    <Container responsiveLevel={level}>
      <Comment>{comment}</Comment>
    </Container>
  );
};
