import {FC, useState} from 'react';
import styled, {CSSObject} from '@emotion/styled';
import {animated, easings, useSpring} from 'react-spring';

import {APP} from '../constants';

const curtainStyle: CSSObject = {
  top: '0',
  position: 'absolute',
  height: '100%',
  backgroundColor: '#100c08', // TODO: Sync with style.css
  width: '50%',
};

console.warn(document.body.style.backgroundColor);

const Left = styled(animated.div)(curtainStyle, {
  left: '0',
});

const Right = styled(animated.div)(curtainStyle, {
  right: '0',
});

const halfWidth = APP.WIDTH / 2;

export const Curtains: FC = ({children}) => {
  const [showCurtains, setShowCurtains] = useState(true);

  const common = {
    from: {translateX: '0'},
    onRest: () => setShowCurtains(false),
    config: {
      duration: 5000,
      // Chose because the tailend is more cinematographic
      easing: easings.easeOutCubic,
    },
    cancel: !showCurtains,
  };

  const leftStyle = useSpring({
    ...common,
    translateX: `-${halfWidth}px`,
  });

  const rightStyle = useSpring({
    ...common,
    translateX: `${halfWidth}px`,
  });

  if (showCurtains) {
    return (
      <>
        {children}
        <Left style={leftStyle} />
        <Right style={rightStyle} />
      </>
    );
  }

  return <>{children}</>;
};
