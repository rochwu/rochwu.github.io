import styled from '@emotion/styled';
import {useLayoutEffect, useRef, VFC} from 'react';

import {DodgingButton} from '../DodgingButton';
import {useGps} from '../GpsContext';
import {LostText} from '../LostText';
import {Taunts} from '../Taunts';
import {Unlocks} from '../Unlocks';

const Container = styled.div({
  position: 'relative',
  width: '100%',
  height: '100%',
});

export const Main: VFC = () => {
  const container = useRef<HTMLDivElement>(null);
  const gps = useGps();

  useLayoutEffect(() => {
    const updateWidth = () => {
      const {width, height} = container.current!.getBoundingClientRect();

      gps.set('main', {width, height});
    };

    updateWidth();

    const observer = new ResizeObserver(updateWidth);

    observer.observe(container.current!);

    return () => {
      observer.disconnect();
    };
  }, [gps]);

  // Everything here should be position absolute
  return (
    <Container ref={container}>
      <LostText />
      <Taunts />
      <DodgingButton />
      <Unlocks />
    </Container>
  );
};
