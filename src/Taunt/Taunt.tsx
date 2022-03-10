import {useRef, useState, VFC} from 'react';
import styled from '@emotion/styled';
import {animated, useSpring} from 'react-spring';
import {useSetRecoilState} from 'recoil';

import {MILESTONES} from '../constants';
import {starsFelledState, tauntsState} from '../state';

import {cry} from './cry';
import {TauntProps} from './types';
import {Position} from './Position';

const Animation = styled(animated.div)({
  fontSize: '0.5em',
  padding: '0.5em',
  width: '100%',
});

const range = [0, 0.1, 1];
const output = [1, 1.5, 1];

const AnimatedTaunt: VFC<Omit<TauntProps, 'top' | 'left'>> = ({
  today,
  birthday,
  insult,
}) => {
  const lifespan = today - birthday;
  const age = 100 - (lifespan / MILESTONES.MAX_TAUNT_AGE) * 100;

  const isUnmounting = useRef(false);

  const setTaunts = useSetRecoilState(tauntsState);
  const setStarsFelled = useSetRecoilState(starsFelledState);

  const [message, setMessage] = useState(() => insult);

  const [{explode, ...style}, api] = useSpring(() => ({
    from: {
      explode: 0,
      opacity: `${age}%`,
      cursor: 'pointer',
    },
    explode: 1,
    config: {
      duration: 300,
    },
  }));

  if (!isUnmounting.current) {
    api.start({
      opacity: `${age}%`,
    });
  }

  const handleClick = () => {
    const unmount = () => {
      setTaunts((previous) => {
        const toRemove = previous.findIndex(
          (taunt) => taunt.birthday === birthday,
        );

        return [
          ...previous.slice(0, toRemove),
          ...previous.slice(toRemove + 1),
        ];
      });
    };

    setMessage(cry());
    isUnmounting.current = true;
    setStarsFelled((previous) => previous + 1);

    api.start({
      cursor: 'default',
      explode: 0,
      opacity: `0%`,
      onRest: unmount,
      config: {duration: 1000},
    });
  };

  return (
    <Animation
      onClick={!isUnmounting.current ? handleClick : undefined}
      style={{
        ...style,
        scale: explode.to(range, output),
      }}
    >
      {message}
    </Animation>
  );
};

export const Taunt: VFC<TauntProps> = ({top, left, ...props}) => {
  return (
    <Position top={top} left={left}>
      <AnimatedTaunt {...props} />
    </Position>
  );
};
