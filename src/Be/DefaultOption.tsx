import {
  HTMLAttributes,
  KeyboardEventHandler,
  MouseEventHandler,
  VFC,
} from 'react';

import {actions, useDuckDispatch, useDuckState} from './duck';
import {Option} from './Option';

type Props = HTMLAttributes<HTMLDivElement> & {
  identifier: 0;
};

export const DefaultOption: VFC<Props> = ({
  identifier,
  onMouseEnter,
  onKeyUp,
  ...props
}) => {
  const state = useDuckState();
  const dispatch = useDuckDispatch();

  const select = () => {
    dispatch(actions.select(identifier));
  };

  const enter: MouseEventHandler<HTMLDivElement> = (event) => {
    select();

    onMouseEnter?.(event);
  };

  const keyUp: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === 'Tab') {
      select();
    }

    onKeyUp?.(event);
  };

  return (
    <Option
      onMouseEnter={enter}
      onKeyUp={keyUp}
      isActive={state.selectedId === identifier}
      {...props}
    >
      what?
    </Option>
  );
};
