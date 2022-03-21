import {useRef, useState, VFC, PointerEvent, useEffect} from 'react';
import styled from '@emotion/styled';
import {useDrag} from '@use-gesture/react';
import {useSetRecoilState} from 'recoil';

import {AppLoop} from '../AppLoop';
import {DayTheme} from '../StyledContext';
import {setUnlockState} from '../state';
import {Content} from '../Content';

import {useWidthRefs} from './useWidthRefs';
import {Slider} from './Slider';

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

export const ContentMirrored: VFC = () => {
  const [percent, setPercent] = useState(() => 0);

  const ref = useRef<HTMLDivElement>(null);
  const {width, offset} = useWidthRefs(ref);

  const unlock = useSetRecoilState(setUnlockState);

  useEffect(() => {
    // Not a debug console, just to let console people I know wussup
    console.log(`oh? you are here, mhm, I promise you can reach that button`);
  }, []);

  const bind = useDrag<PointerEvent<HTMLDivElement>>(({xy: [x]}) => {
    const normalX = x - offset.current;
    const percent = Math.max(Math.min((normalX / width.current) * 100, 100), 0);
    setPercent(percent);

    if (percent >= 1) {
      unlock('dayMode');
    }
  });

  const widthStyle = {
    width: width.current,
  };

  const windowStyle = {
    width: `${percent}%`,
  };

  // Heavily uses style to prevent styled from making hella stylesheets
  return (
    <Container ref={ref} style={widthStyle}>
      <Content style={widthStyle} />
      <Window style={windowStyle}>
        <DayTheme>
          <Content style={widthStyle} />
        </DayTheme>
      </Window>
      <Slider {...bind()} atPercent={percent} />
      <AppLoop />
    </Container>
  );
};
