import styled from '@emotion/styled';
import {useEffect, useRef} from 'react';

import {DodgingButton} from './DodgingButton';
import {useGps} from './GpsContext';
import {Commentary} from './Commentary';
import {LostText} from './LostText';
import {Taunts} from './Taunts';
import {IncrementalGame} from './IncrementalGame';

const Container = styled.div({
  fontFamily: 'sans-serif',
  width: '100vw',
  height: '100vh',
});

export default function App() {
  const container = useRef<HTMLDivElement>(null);
  const gps = useGps();

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      const {width, height} = container.current!.getBoundingClientRect();

      gps.set('container', {width, height});
    });

    observer.observe(container.current!);

    return () => {
      observer.disconnect();
    };
  }, [gps]);

  return (
    <Container ref={container}>
      <Commentary />
      <DodgingButton />
      <LostText />
      <Taunts />
      <IncrementalGame />
    </Container>
  );
}
