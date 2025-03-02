import styled from '@emotion/styled';
import {useEffect} from 'react';
import {animated, useSpring} from '@react-spring/web';

import {sliderWidth} from './dimensions';

const Bar = styled(animated.div)(
  ({theme}) => ({
    background: `linear-gradient(to right, ${theme.text}, ${theme.app})`,
  }),
  {
    position: 'absolute',
    left: '50%',
    height: '100%',
  },
);

const durationMs = 5000;

const halfSliderWidth = sliderWidth / 2;

const randomWidth = () => {
  const max = halfSliderWidth; // Pretty number
  const width = Math.floor(Math.random() * (max + 1));

  return `${(width / sliderWidth) * 100}%`;
};

const randomInterval = () => {
  const min = durationMs;
  const max = 13000;

  const interval = Math.floor(Math.random() * (max - min + 1) + min);

  return interval;
};

export const WaveBar = () => {
  const from = {
    width: '0%',
  };

  const [style, api] = useSpring(() => ({
    from,
    config: {
      duration: durationMs,
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
