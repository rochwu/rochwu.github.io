import {FC, ReactNode, useLayoutEffect, useRef, useState} from 'react';
import styled, {CSSObject} from '@emotion/styled';

type Props = Pick<CSSObject, 'height'>;

const Container = styled.div<Props>(
  ({height}) => ({
    height,
  }),
  // All these prevents translate to overflow
  // Specially in Firefox
  {width: '100%', position: 'relative', overflow: 'hidden'},
);

/**
 * Mobile friendlily, defines height
 */
export const DefineViewport = ({children}: {children: ReactNode}) => {
  const [height, setHeight] = useState<Props['height']>('100vh');
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const windowHeight = window.innerHeight;
    if (windowHeight < (ref.current?.getBoundingClientRect().height || 0)) {
      setHeight(windowHeight);
    }
  }, []);

  return (
    <Container ref={ref} height={height}>
      {children}
    </Container>
  );
};
