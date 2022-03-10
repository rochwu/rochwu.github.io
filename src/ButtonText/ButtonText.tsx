import styled from '@emotion/styled';
import {forwardRef, HTMLAttributes} from 'react';
import {IoLogoGithub} from 'react-icons/io';

const FONT_SIZE = '32px';

const Span = styled.span(
  {
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: FONT_SIZE,
    textAlign: 'center',
    fontFamily: 'sans-serif',
  },
  ({theme}) => ({
    color: theme.button,
  }),
);

const Icon = styled(IoLogoGithub)({
  marginRight: '8px',
});

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
