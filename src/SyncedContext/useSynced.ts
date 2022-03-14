import {useCallback, useContext} from 'react';

import {Context} from './Context';
import {Schedule} from './types';

/**
 * Be mindful of function references being changed on render
 */
export const useSynced = (): Schedule => {
  const context = useContext(Context);

  return useCallback(
    (syncedCallback, options) => {
      context.schedule.subscribe(syncedCallback, options);
    },
    [context],
  );
};
