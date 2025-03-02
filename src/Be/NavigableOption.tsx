import {KeyboardEventHandler, ReactNode} from 'react';
import {useNavigate} from 'react-router-dom';

import {actions, useDuckDispatch} from './duck';
import {Option} from './Option';

type Props = {
  to: string;
  identifier: number;
  children: ReactNode;
};

export const NavigableOption = ({children, to, identifier}: Props) => {
  const dispatch = useDuckDispatch();
  const navigage = useNavigate();

  const link = () => {
    if (to.startsWith('http')) {
      window.location.assign(to);
    } else {
      navigage(to);
    }
  };

  const select = () => {
    dispatch(actions.select(identifier));
  };

  const keyUp: KeyboardEventHandler<HTMLDivElement> = (event) => {
    // On tab focus, up happens before down
    if (event.key === 'Tab') {
      select();
    }
  };

  // TODO: Find out why I onClick is not firing
  const keyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === ' ') {
      link();
    }
  };

  return (
    <Option
      style={{cursor: 'pointer'}}
      onClick={link}
      onKeyUp={keyUp}
      onKeyDown={keyDown}
      onMouseEnter={select}
    >
      {children}
    </Option>
  );
};
