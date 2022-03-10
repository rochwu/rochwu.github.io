import {FC} from 'react';
import {ThemeProvider} from '@emotion/react';

import {APP, BUTTON, TEXT} from '../constants';

const commonTheme = {
  button: BUTTON.COLOR,
};

export const nightTheme = {
  ...commonTheme,
  text: TEXT.COLOR,
  app: APP.BACK_COLOR,
};

export type Theme = typeof nightTheme;

export const dayTheme: Theme = {
  ...commonTheme,
  text: APP.BACK_COLOR,
  app: TEXT.COLOR,
};

export const NightProvider: FC = ({children}) => {
  return <ThemeProvider theme={nightTheme}>{children}</ThemeProvider>;
};

export const DayProvider: FC = ({children}) => {
  return <ThemeProvider theme={dayTheme}>{children}</ThemeProvider>;
};
