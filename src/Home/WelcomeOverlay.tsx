import {useEffect, useRef, useState, VFC} from 'react';
import styled from '@emotion/styled';
import {useSpring, animated} from 'react-spring';

import {TEXT} from '../constants';

import {Note} from './Note';

const Container = styled(animated.div)({
  position: 'absolute',
  top: '0',
  height: '100%',
  width: '100%',
  color: TEXT.COLOR,
});

const WelcomeMessage = styled(animated.div)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textTransform: 'uppercase',
  fontSize: '1em',
  height: '100%',
});

export const WelcomeOverlay: VFC<{shouldShow: boolean}> = ({shouldShow}) => {
  const [shouldRender, setShouldRender] = useState(true);
  const [title, setTitle] = useState('unnecessary fancy welcoming screen');
  const handle = useRef<number>();

  const [welcomeMessageStyle] = useSpring(() => ({
    from: {opacity: '100%'},
    opacity: '0',
    loop: {reverse: true},
    config: {duration: 690},
    cancel: !shouldShow,
  }));

  const unmountStyle = useSpring({
    from: {opacity: '100%'},
    opacity: '0',
    onRest: () => setShouldRender(false),
    config: {duration: 420},
    cancel: shouldShow,
  });

  useEffect(() => {
    // TODO: Would love to do log who actually needed help here
    handle.current = window.setTimeout(() => {
      setTitle('just press any key to continue');
    }, 12345);

    return () => {
      clearInterval(handle.current);
    };
  }, []);

  if (!shouldRender) {
    return null;
  }

  return (
    <Container style={unmountStyle}>
      <Note />
      <WelcomeMessage
        style={welcomeMessageStyle}
        aria-label="unnecessary fancy welcoming screen, press any key to continue"
      >
        {title}
      </WelcomeMessage>
    </Container>
  );
};
