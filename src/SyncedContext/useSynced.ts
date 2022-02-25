import {useCallback, useContext} from 'react';

import {Context} from './Context';
import {Schedule} from './types';

/**
 * Be mindful of function references being changed on render
 */
export const useSynced = (): Schedule => {
  const context = useContext(Context);

  const schedule = useCallback(
    (syncedCallback) => {
      context.subscribe(syncedCallback);
    },
    [context],
  );

  return schedule;
};
