import {CSSObject} from '@emotion/react';

import {radialGradients} from './radialGradients';

export const activeStyle: CSSObject = {
  color: 'transparent',
  backgroundClip: 'text',
  backgroundImage: radialGradients([
    '88% 12%, #86e1a2',
    '23% 77%, #7cb0d2',
    '43% 57%, #ff5c30',
    '67% 90%, #2c79ff',
    '33% 10%, #fe56fb',
  ]),
};
