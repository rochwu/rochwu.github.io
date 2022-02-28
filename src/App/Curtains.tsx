import {VFC, useState} from 'react';
import styled, {CSSObject} from '@emotion/styled';
import {animated, easings, useSpring} from 'react-spring';

import {APP, BODY, TEXT} from '../constants';

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
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end',
  right: '0',
  writingMode: 'vertical-rl',
  textTransform: 'uppercase',
});

const curtainMessage = 'pointless aspect ratio transition';

const halfWidth = APP.WIDTH / 2;

export const Curtains: VFC<{shouldShow: boolean}> = ({shouldShow}) => {
  const [shouldRender, setShouldRender] = useState(true);

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
    from: {translateX: '0', color: TEXT.COLOR},
    translateX: `${halfWidth}px`,
    color: BODY.BACK_COLOR,
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
