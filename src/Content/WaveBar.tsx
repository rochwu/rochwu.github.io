import styled from '@emotion/styled';
import {useEffect, VFC} from 'react';
import {animated, useSpring} from 'react-spring';

import {sliderWidth} from './dimensions';

const Bar = styled(animated.div)(
  ({theme}) => ({
    backgroundColor: theme.text,
  }),
  {
    height: '100%',
  },
);

const DURATION_MS = 5000;

const randomWidth = () => {
  const max = sliderWidth / 2;
  const width = Math.floor(Math.random() * (max + 1));

  return `${(width / sliderWidth) * 100}%`;
};

const randomInterval = () => {
  const min = DURATION_MS;
  const max = 13000;

  const interval = Math.floor(Math.random() * (max - min + 1) + min);

  return interval;
};

export const WaveBar: VFC = () => {
  const from = {
    width: '0%',
  };

  const [style, api] = useSpring(() => ({
    from,
    config: {
      duration: DURATION_MS,
    },
  }));

  const replay = () => {
    setTimeout(() => {
      api.start({
        to: async (next) => {
          await next({
            width: randomWidth(),
          });
          await next(from);

          replay();
        },
      });
    }, randomInterval());
  };

  useEffect(() => {
    replay();
  }, []);

  return <Bar style={style} />;
};
