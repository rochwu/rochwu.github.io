import {FC, useLayoutEffect, useRef, useState} from 'react';
import styled, {CSSObject} from '@emotion/styled';

type Props = Pick<CSSObject, 'height'>;

const Container = styled.div<Props>(({height}) => ({
  height,
}));

/**
 * Mobile friendlily defines height
 */
export const DefineHeight: FC = ({children}) => {
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
