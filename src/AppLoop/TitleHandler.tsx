import {useEffect} from 'react';

import {MILESTONES} from '../constants';

import {LoopProps} from './types';

export const TitleHandler = ({attempts}: LoopProps) => {
  const change = attempts >= MILESTONES.INCREMENTAL_ON;

  useEffect(() => {
    if (change) {
      document.title = 'Point? Less';
    }
  }, [change]);

  return null;
};
