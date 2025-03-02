import {useState} from 'react';
import styled, {CSSObject} from '@emotion/styled';
import {Theme, useTheme} from '@emotion/react';
import {animated, easings, useSpring} from '@react-spring/web';

import {APP} from '../constants';

const curtainStyle = ({theme}: {theme: Theme}): CSSObject => ({
  top: '0',
  position: 'absolute',
  height: '100%',
  backgroundColor: theme.background,
  width: '50%',
});

const Left = styled(animated.div)(curtainStyle, {
  left: '0',
});

const Right = styled(animated.div)(curtainStyle, {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end',
  right: '0',
  writingMode: 'vertical-rl',
  textTransform: 'uppercase',
});

const curtainMessage = 'pointless aspect ratio transition';

const halfWidth = APP.WIDTH / 2;

export const Curtains = ({shouldShow}: {shouldShow: boolean}) => {
  const [shouldRender, setShouldRender] = useState(true);
  const theme = useTheme();

  const common = {
    onRest: () => setShouldRender(false),
    config: {
      duration: 5000,
      // Chose because the tailend is more cinematographic
      easing: easings.easeOutCubic,
    },
    cancel: shouldShow,
  };

  const leftStyle = useSpring({
    ...common,
    from: {translateX: '0'},
    translateX: `-${halfWidth}px`,
  });

  const rightStyle = useSpring({
    ...common,
    from: {translateX: '0', color: theme.text},
    translateX: `${halfWidth}px`,
    color: theme.background,
  });

  if (!shouldRender) {
    return null;
  }

  return (
    <>
      <Left style={leftStyle} />
      <Right aria-hidden style={rightStyle}>
        {!shouldShow ? curtainMessage : ''}
      </Right>
    </>
  );
};
