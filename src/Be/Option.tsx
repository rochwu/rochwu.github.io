import {
  FocusEventHandler,
  HTMLAttributes,
  KeyboardEventHandler,
  MouseEventHandler,
  useState,
} from 'react';
import styled from '@emotion/styled';

import {Highlight} from './Highlight';
import {activeStyle} from './activeStyle';

const Container = styled.div({
  position: 'relative',
  outline: 'none',
});

const Text = styled.div<{isActive?: boolean}>(({isActive, theme}) => {
  if (isActive) {
    return activeStyle;
  }

  return {
    color: theme.text,
  };
});

type Props = HTMLAttributes<HTMLDivElement> & {isActive?: boolean};

export const Option = ({
  children,
  isActive,
  onMouseEnter,
  onMouseLeave,
  onKeyDown,
  onKeyUp,
  onBlur,
  ...props
}: Props) => {
  const [isHighlighted, setHighlight] = useState(false);

  const enter: MouseEventHandler<HTMLDivElement> = (event) => {
    onMouseEnter?.(event);

    setHighlight(true);
  };

  const leave: MouseEventHandler<HTMLDivElement> = (event) => {
    onMouseLeave?.(event);

    setHighlight(false);
  };

  const keyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    onKeyDown?.(event);

    if (event.key === 'Tab') {
      setHighlight(true);
    }
  };

  const keyUp: KeyboardEventHandler<HTMLDivElement> = (event) => {
    onKeyUp?.(event);

    if (event.key === 'Tab') {
      setHighlight(true);
    }
  };

  const blur: FocusEventHandler<HTMLDivElement> = (event) => {
    onBlur?.(event);

    setHighlight(false);
  };

  return (
    <Container
      tabIndex={0}
      onMouseEnter={enter}
      onMouseLeave={leave}
      onKeyDown={keyDown}
      onKeyUp={keyUp}
      onBlur={blur}
      {...props}
    >
      <Text isActive={isActive || isHighlighted}>{children}</Text>
      {isHighlighted && <Highlight />}
    </Container>
  );
};
