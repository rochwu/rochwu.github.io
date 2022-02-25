import styled from '@emotion/styled';
import {FC, HTMLAttributes} from 'react';

import {BADGE} from '../constants';

type ContainerProps = {isVisible: boolean};

const Container = styled.div<ContainerProps>(
  ({isVisible}) => ({visibility: isVisible ? 'visible' : 'hidden'}),
  {
    minHeight: BADGE.SIZE,
    minWidth: BADGE.SIZE,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    userSelect: 'none',
  },
);

type SpanProps = {
  backgroundColor: string;
  color: string;
};

const Span = styled.span<SpanProps>(
  ({backgroundColor, color}) => ({backgroundColor, color}),
  {
    padding: '2px 8px',
    fontSize: '1em',
    borderRadius: '13px',
  },
);

export type BadgeProps = ContainerProps & SpanProps;

export const Badge: FC<BadgeProps> = ({children, isVisible, ...props}) => {
  return (
    <Container isVisible={isVisible}>
      <Span {...props}>{children}</Span>
    </Container>
  );
};
