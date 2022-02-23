import {useLayoutEffect, useRef, useState, VFC} from 'react';
import styled from '@emotion/styled';
import {useSpring, animated} from 'react-spring';

import {Content} from './Content';
import {TEXT} from '../constants';

const Container = styled(animated.div)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: TEXT.COLOR,
  textTransform: 'uppercase',
  fontSize: '1em',
  height: '100%',
});

export const Loader: VFC = () => {
  const [ready, setReady] = useState(false);
  const [title, setTitle] = useState('unnecessary fancy welcoming screen');
  const interval = useRef<number>();

  const [style] = useSpring(() => ({
    from: {opacity: '100%'},
    opacity: '0',
    loop: {reverse: true},
    config: {duration: 690},
    cancel: ready,
  }));

  useLayoutEffect(() => {
    // Not a debug console, just to talk to people using console you know
    console.log(`oh we're checking console now`);

    // TODO: Would love to do log who actually needed help here
    interval.current = window.setTimeout(() => {
      setTitle('press any key to continue');
    }, 12345);

    const wake = () => {
      setReady(true);

      // eslint-disable-next-line
      removeListeners();
    };

    const removeListeners = () => {
      window.removeEventListener('mousemove', wake);
      window.removeEventListener('keydown', wake);
    };

    window.addEventListener('mousemove', wake);
    window.addEventListener('keydown', wake);

    return () => {
      clearInterval(interval.current);
      removeListeners();
    };
  }, []);

  if (ready) {
    return <Content />;
  }

  clearInterval(interval.current);

  return (
    <Container
      style={style}
      aria-label="unnecessary fancy welcoming screen, press any key to continue"
    >
      {title}
    </Container>
  );
};
