import {VFC, useState} from 'react';
import styled, {CSSObject} from '@emotion/styled';
import {animated, easings, useSpring} from 'react-spring';

import {APP, BODY} from '../constants';

const curtainStyle: CSSObject = {
  top: '0',
  position: 'absolute',
  height: '100%',
  backgroundColor: BODY.BACK_COLOR, // TODO: Sync with style.css
  width: '50%',
};

const Left = styled(animated.div)(curtainStyle, {
  left: '0',
});

const Right = styled(animated.div)(curtainStyle, {
  right: '0',
});

const halfWidth = APP.WIDTH / 2;

export const Curtains: VFC<{shouldShow: boolean}> = ({shouldShow}) => {
  const [shouldRender, setShouldRender] = useState(true);

  const common = {
    from: {translateX: '0'},
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
    translateX: `-${halfWidth}px`,
  });

  const rightStyle = useSpring({
    ...common,
    translateX: `${halfWidth}px`,
  });

  if (!shouldRender) {
    return null;
  }

  return (
    <>
      <Left style={leftStyle} />
      <Right style={rightStyle} />
    </>
  );
};
