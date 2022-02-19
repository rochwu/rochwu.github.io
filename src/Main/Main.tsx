import styled from '@emotion/styled';
import {useEffect, useRef, VFC} from 'react';

import {DodgingButton} from '../DodgingButton';
import {useGps} from '../GpsContext';
import {LostText} from '../LostText';
import {Taunts} from '../Taunts';

const Container = styled.div({
  position: 'relative',
  width: '100%',
  height: '100%',
});

export const Main: VFC = () => {
  const container = useRef<HTMLDivElement>(null);
  const gps = useGps();

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      const {width, height} = container.current!.getBoundingClientRect();

      gps.set('main', {width, height});
    });

    observer.observe(container.current!);

    return () => {
      observer.disconnect();
    };
  }, [gps]);

  return (
    <Container ref={container}>
      <DodgingButton />
      <LostText />
      <Taunts />
    </Container>
  );
};
