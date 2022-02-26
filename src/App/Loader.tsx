import {useEffect, useRef, useState, VFC} from 'react';
import styled from '@emotion/styled';
import {useSpring, animated} from 'react-spring';

import {TEXT} from '../constants';

import {Content} from './Content';
import {useIsReady} from './useIsReady';
import {Note} from './Note';

const Container = styled(animated.div)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: TEXT.COLOR,
  textTransform: 'uppercase',
  fontSize: '1em',
  height: '100%',
});

// TODO: Maybe add visibility change to remount this when inactive
export const Loader: VFC = () => {
  const isReady = useIsReady();
  const [title, setTitle] = useState('unnecessary fancy welcoming screen');
  const handle = useRef<number>();

  const [style] = useSpring(() => ({
    from: {opacity: '100%'},
    opacity: '0',
    loop: {reverse: true},
    config: {duration: 690},
    cancel: isReady,
  }));

  useEffect(() => {
    // Not a debug console, just to talk to people using console you know
    console.log(
      `oh? you are here, mhm, there %care`,
      `font-style: italic; font-weight: bold`,
      `ways to reach that button`,
    );

    // TODO: Would love to do log who actually needed help here
    handle.current = window.setTimeout(() => {
      setTitle('press any key to continue');
    }, 12345);

    return () => {
      clearInterval(handle.current);
    };
  }, []);

  if (isReady) {
    clearInterval(handle.current);
    return <Content />;
  }

  return (
    <>
      <Note />
      <Container
        style={style}
        aria-label="unnecessary fancy welcoming screen, press any key to continue"
      >
        {title}
      </Container>
    </>
  );
};