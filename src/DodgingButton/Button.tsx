import styled, {CSSObject} from '@emotion/styled';

import {BUTTON} from '../constants';

const border = `${BUTTON.BORDER_SIZE}px groove ${BUTTON.COLOR}`;

const agentOverride: CSSObject = {
  backgroundColor: 'white',
  margin: 0,
  padding: '5px 20px',
  borderRadius: '32px',
  boxSizing: 'border-box', // clearer dimension calculations
  border: border,
  ':focus': {
    outline: border,
    outlineOffset: '2px',
  },
};

/**
 * Pure
 */
export const Button = styled.button(agentOverride, {
  display: 'block',
  position: 'absolute',
  lineHeight: 'initial',
});
