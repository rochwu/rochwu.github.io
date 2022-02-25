import {useRef, useState, VFC} from 'react';
import styled from '@emotion/styled';
import {animated, useSpring} from 'react-spring';
import {useSetRecoilState} from 'recoil';

import {TauntState} from '../types';
import {MILESTONES, TEXT} from '../constants';
import {starsFelledState, tauntsState} from '../state';

import {cry} from './cry';

const FONT_SIZE = '0.5em';

export type TauntProps = TauntState & {today: number};

const Container = styled(animated.span)({
  position: 'absolute',
  fontSize: FONT_SIZE,
  color: TEXT.COLOR,
  padding: '0.5em',
});

const range = [0, 0.1, 1];
const output = [1, 1.5, 1];

export const Taunt: VFC<TauntProps> = ({
  top,
  left,
  insult,
  birthday,
  today,
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
      translate: '1em, -2.25em',
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

  const staticStyle = {
    top: `${top}%`,
    left: `${left}%`,
  };

  return (
    <Container
      onClick={!isUnmounting.current ? handleClick : undefined}
      style={{
        ...style,
        ...staticStyle,
        scale: explode.to(range, output),
      }}
    >
      {message}
    </Container>
  );
};
