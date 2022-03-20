import {useEffect, VFC} from 'react';

import {MILESTONES} from '../constants';

import {LoopProps} from './types';

export const TitleHandler: VFC<LoopProps> = ({attempts}) => {
  const change = attempts >= MILESTONES.INCREMENTAL_ON;

  useEffect(() => {
    if (change) {
      document.title = 'Point? Less';
    }
  }, [change]);

  return null;
};
