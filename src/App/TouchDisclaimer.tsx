import styled from '@emotion/styled';
import {useRef, useState, VFC} from 'react';
import {animated, useSpring} from 'react-spring';

import {APP} from '../constants';
import {isTouchDevice} from '../isTouchDevice';

const Container = styled(animated.div)({
  position: 'absolute',
  bottom: 0,
  cursor: 'pointer',
  width: '100%',
  backgroundColor: `#2FCBD3`,
  color: APP.BACK_COLOR,
  textTransform: 'uppercase',
  fontFamily: `'Source Code Pro', 'Andale Mono', monospace`,
  fontSize: '0.75',
  fontWeight: 'bold',
  textAlign: 'center',
});

export const TouchDisclaimer: VFC = () => {
  const [shouldRender, setShouldRender] = useState(() => !isTouchDevice());
  const ref = useRef<HTMLDivElement>(null);

  const [style, api] = useSpring(() => ({
    from: {
      opacity: 1,
    },
    config: {
      duration: 169,
    },
    onRest: () => setShouldRender(false),
  }));

  const close = () => {
    api.start({opacity: 0});
  };

  if (!shouldRender) {
    return null;
  }

  return (
    <Container ref={ref} style={style} aria-hidden onClick={close}>
      whoops won't work right on a touch screen, try a mouse! touch this banner
      to dismiss
    </Container>
  );
};
