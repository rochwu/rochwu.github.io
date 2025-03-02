import {FC, ReactNode} from 'react';
import {ThemeProvider} from '@emotion/react';

import {APP, BODY, BUTTON, TEXT} from '../constants';

const common = {
  background: BODY.BACK_COLOR,
};

// The OG theme, I just wanted to document that
const nightTheme = {
  ...common,
  button: BUTTON.COLOR,
  text: TEXT.COLOR,
  app: APP.BACK_COLOR,
};

export type Theme = typeof nightTheme;

const dayTheme: Theme = {
  ...common,
  button: '#489186',
  text: APP.BACK_COLOR,
  app: TEXT.COLOR,
};

type Props = {children: ReactNode};

export const NightTheme = ({children}: Props) => {
  return <ThemeProvider theme={nightTheme}>{children}</ThemeProvider>;
};

export const DayTheme = ({children}: Props) => {
  return <ThemeProvider theme={dayTheme}>{children}</ThemeProvider>;
};
