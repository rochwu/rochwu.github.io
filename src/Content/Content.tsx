import {useRef, useState, VFC, PointerEvent, HTMLAttributes} from 'react';
import styled from '@emotion/styled';
import {useDrag} from '@use-gesture/react';
import {useSetRecoilState} from 'recoil';

import {AppLoop} from '../AppLoop';
import {Header} from '../Header';
import {Main} from '../Main';
import {DayProvider} from '../StyledContext';
import {setUnlockState} from '../state';

import {sliderWidth} from './dimensions';
import {useWidthRefs} from './useWidthRefs';

const Container = styled.div({
  position: 'relative',
  height: '100%',
  margin: 'auto',
});

const ComponentContainer = styled.div(
  {
    display: 'flex',
    position: 'absolute',
    flexDirection: 'column',
    height: '100%',
    left: 0,
  },
  ({theme}) => ({
    color: theme.text,
    backgroundColor: theme.app,
  }),
);

const Window = styled.div({
  position: 'absolute',
  height: '100%',
  overflowX: 'hidden',
});

const Slider = styled.div({
  position: 'absolute',
  height: '100%',
  width: sliderWidth,
  backgroundColor: '#808080',
  cursor: 'grab',
  ':active': {
    cursor: 'grabbing',
  },
});

const Component: VFC<HTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <ComponentContainer {...props}>
      <Header />
      <Main />
    </ComponentContainer>
  );
};

export const Content: VFC = () => {
  const [percent, setPercent] = useState(() => '0%');

  const ref = useRef<HTMLDivElement>(null);
  const {width, offset} = useWidthRefs(ref);

  const unlock = useSetRecoilState(setUnlockState);

  const bind = useDrag<PointerEvent<HTMLDivElement>>(({xy: [x]}) => {
    const normalX = x - offset.current;
    const percent = Math.max(Math.min((normalX / width.current) * 100, 100), 0);
    setPercent(`${percent}%`);

    if (percent >= 1) {
      unlock('dayMode');
    }
  });

  const componentStyle = {width: width.current - sliderWidth * 2};

  return (
    <Container ref={ref} style={{width: width.current}}>
      <Component style={componentStyle} />
      <Window style={{width: percent}}>
        <DayProvider>
          <Component style={componentStyle} />
        </DayProvider>
      </Window>
      <Slider aria-hidden {...bind()} style={{left: percent}} />
      <AppLoop />
    </Container>
  );
};
