import styled, {CSSObject} from '@emotion/styled';
import {forwardRef, HTMLAttributes} from 'react';
import {IoLogoGithub} from 'react-icons/io';

import {BUTTON} from '../constants';

const FONT_SIZE = '32px';

const agentOverride: CSSObject = {
  color: BUTTON.COLOR,
};

const Span = styled.span(agentOverride, {
  display: 'inline-flex',
  alignItems: 'center',
  fontSize: FONT_SIZE,
  textAlign: 'center',
  fontFamily: 'sans-serif',
});

const Icon = styled(IoLogoGithub)({
  marginRight: '8px',
});

// Pure
export const ButtonText = forwardRef<
  HTMLSpanElement,
  HTMLAttributes<HTMLSpanElement>
>((props, ref) => {
  return (
    <Span ref={ref} {...props}>
      <Icon size={FONT_SIZE} />
      github
    </Span>
  );
});
