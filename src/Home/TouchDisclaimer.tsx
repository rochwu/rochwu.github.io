import styled from '@emotion/styled';
import {useState} from 'react';
import {animated, useSpring} from '@react-spring/web';

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

export const TouchDisclaimer = () => {
  const [shouldRender, setShouldRender] = useState(() => isTouchDevice());

  const [style, api] = useSpring(() => ({
    from: {
      opacity: 1,
    },
    config: {
      duration: 169,
    },
    onRest: () => setShouldRender(false),
  }));

  if (!shouldRender) {
    return null;
  }

  const close = () => {
    api.start({opacity: 0});
  };

  return (
    <Container aria-hidden style={style} onClick={close}>
      whoops won't work right on a touch screen, try a mouse! touch this banner
      to dismiss
    </Container>
  );
};
