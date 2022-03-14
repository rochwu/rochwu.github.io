import '@emotion/react';

import {Theme as AppTheme} from './Context';

declare module '@emotion/react' {
  export interface Theme extends AppTheme {}
}
