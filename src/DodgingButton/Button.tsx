import styled, {CSSObject} from '@emotion/styled';

import {BUTTON} from '../constants';

const agentOverride: CSSObject = {
  backgroundColor: 'transparent',
  margin: 0,
  padding: '4px 20px', // Keep it even for lost text calculation
  borderRadius: '32px',
  boxSizing: 'border-box', // clearer dimension calculations
};

/**
 * Pure
 */
export const Button = styled.button(
  agentOverride,
  {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  ({theme}) => ({
    border: `${BUTTON.BORDER_SIZE}px outset ${theme.button}`,
  }),
);
