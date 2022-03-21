import {FocusEventHandler, useState, VFC} from 'react';
import styled from '@emotion/styled';

import {NavigableOption} from './NavigableOption';
import {DefaultOption} from './DefaultOption';
import {actions, useDuckDispatch} from './duck';
import {options} from './options';

const Container = styled.div({
  position: 'relative',
});

const Absolute = styled.div({
  // Jank. Forces the extra options to be below after "DefaultOption"
  // which would have an anchored position after render
  position: 'absolute',
});

export const Options: VFC = () => {
  const dispatch = useDuckDispatch();

  const [isOpen, setOpen] = useState(false);

  const open = () => {
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
    dispatch(actions.select(0));
  };

  const blur: FocusEventHandler<HTMLDivElement> = (event) => {
    // null when blur passes to an element outside of this tree
    if (!event.relatedTarget) {
      close();
    }
  };

  return (
    <Container onBlur={blur}>
      <DefaultOption
        onKeyUp={open}
        onMouseEnter={open}
        onMouseLeave={close}
        identifier={0}
      />
      {isOpen && (
        <Absolute onMouseEnter={open} onMouseLeave={close}>
          {options.map(([to, label], index) => (
            <NavigableOption to={to} identifier={index + 1} key={label}>
              {label}
            </NavigableOption>
          ))}
        </Absolute>
      )}
    </Container>
  );
};
