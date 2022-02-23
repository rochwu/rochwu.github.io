import {useLayoutEffect, useRef, useState, VFC} from 'react';
import styled, {CSSObject} from '@emotion/styled';
import {RecoilRoot} from 'recoil';
import {useSpring, animated} from 'react-spring';

import {GpsProvider} from './GpsContext';
import {ResponsiveProvider} from './ResponsiveContext';
import {SyncedProvider} from './SyncedContext';
import {Header} from './Header';
import {Main} from './Main';
import {APP, TEXT} from './constants';

const screen: CSSObject = {
  height: '100vh',
};

const Container = styled(animated.div)(screen, {
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: APP.BACK_COLOR,
  margin: 'auto',
  maxWidth: '1024px', // Arbitrary, iPad
});

const Fades = styled(animated.div)(screen, {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: TEXT.COLOR,
  textTransform: 'uppercase',
  fontSize: '1em',
});

const App: VFC = () => {
  const [style] = useSpring(() => ({
    from: {opacity: '0'},
    opacity: '100%',
    config: {duration: 333},
  }));

  return (
    <Container style={style}>
      <Header />
      <Main />
    </Container>
  );
};

const Loader: VFC = () => {
  const [ready, setReady] = useState(false);
  const [title, setTitle] = useState('unnecessary fancy welcoming screen');
  const interval = useRef<ReturnType<typeof setTimeout>>();

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
    interval.current = setTimeout(() => {
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
    return <App />;
  }

  clearInterval(interval.current);

  return (
    <Fades
      style={style}
      aria-label="unnecessary fancy welcoming screen, press any key to continue"
    >
      {title}
    </Fades>
  );
};

export default function () {
  return (
    <RecoilRoot>
      <GpsProvider>
        <ResponsiveProvider>
          <SyncedProvider>
            <Loader />
          </SyncedProvider>
        </ResponsiveProvider>
      </GpsProvider>
    </RecoilRoot>
  );
}
