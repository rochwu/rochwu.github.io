import {useCallback, useContext} from 'react';

import {Context, Synced} from './Context';

export const useSchedule = () => {
  const {schedule} = useContext(Context);

  return useCallback<Synced['schedule']['subscribe']>(
    (syncedCallback, options) => {
      schedule.subscribe(syncedCallback, options);
    },
    [schedule],
  );
};
