import {useRef, useState, VFC, PointerEvent} from 'react';
import styled from '@emotion/styled';
import {useDrag} from '@use-gesture/react';
import {useSetRecoilState} from 'recoil';

import {AppLoop} from '../AppLoop';
import {DayProvider} from '../StyledContext';
import {setUnlockState} from '../state';

import {sliderOffset, sliderWidth} from './dimensions';
import {useWidthRefs} from './useWidthRefs';
import {Slider} from './Slider';
import {MirroredContent} from './MirroredContent';

const Container = styled.div(
  {
    position: 'relative',
    height: '100%',
    margin: 'auto',
  },
  ({theme}) => ({
    backgroundColor: theme.app,
  }),
);

const Window = styled.div({
  position: 'absolute',
  left: 0,
  height: '100%',
  overflowX: 'hidden',
});

export const Content: VFC = () => {
  const [percent, setPercent] = useState(() => 0);

  const ref = useRef<HTMLDivElement>(null);
  const {width, offset} = useWidthRefs(ref);

  const unlock = useSetRecoilState(setUnlockState);

  const bind = useDrag<PointerEvent<HTMLDivElement>>(({xy: [x]}) => {
    const normalX = x - offset.current;
    const percent = Math.max(Math.min((normalX / width.current) * 100, 100), 0);
    setPercent(percent);

    if (percent >= 1) {
      unlock('dayMode');
    }
  });

  const containerStyle = {
    width: width.current,
  };
  const contentStyle = {
    // Slider is centered, only need to acount for half of each side
    width: width.current - sliderOffset,
  };
  const windowStyle = {
    width: `${percent}%`,
  };

  // Heavily uses style to prevent styled from making hella stylesheets
  return (
    <Container ref={ref} style={containerStyle}>
      <MirroredContent style={contentStyle} />
      <Window style={windowStyle}>
        <DayProvider>
          <MirroredContent style={contentStyle} />
        </DayProvider>
      </Window>
      <Slider {...bind()} atPercent={percent} />
      <AppLoop />
    </Container>
  );
};
