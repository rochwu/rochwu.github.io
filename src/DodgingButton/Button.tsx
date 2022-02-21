import styled, {CSSObject} from '@emotion/styled';

import {BUTTON} from '../constants';

const border = `${BUTTON.BORDER_SIZE}px groove ${BUTTON.COLOR}`;

const agentOverride: CSSObject = {
  backgroundColor: 'transparent',
  margin: 0,
  padding: '4px 20px', // Keep it even for lost text calculation
  borderRadius: '32px',
  boxSizing: 'border-box', // clearer dimension calculations
  border,
  ':focus': {
    outline: border,
    outlineOffset: '2px',
  },
};

/**
 * Pure
 */
export const Button = styled.button(agentOverride, {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
});
