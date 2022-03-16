import {FC} from 'react';
import {ThemeProvider} from '@emotion/react';

import {APP, BUTTON, TEXT} from '../constants';

// The OG theme, I just wanted to document that
const nightTheme = {
  button: BUTTON.COLOR,
  text: TEXT.COLOR,
  app: APP.BACK_COLOR,
};

export type Theme = typeof nightTheme;

const dayTheme: Theme = {
  button: '#489186',
  text: APP.BACK_COLOR,
  app: TEXT.COLOR,
};

export const NightProvider: FC = ({children}) => {
  return <ThemeProvider theme={nightTheme}>{children}</ThemeProvider>;
};

export const DayProvider: FC = ({children}) => {
  return <ThemeProvider theme={dayTheme}>{children}</ThemeProvider>;
};
