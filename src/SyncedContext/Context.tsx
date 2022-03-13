import {createContext, FC, useContext, useLayoutEffect} from 'react';

import {Synced} from './types';
import {setAll} from './setAll';
import {setOnce} from './setOnce';
import {setSchedule} from './setSchedule';

const initialValue: Synced = {
  schedule: {callbacks: []},
  all: {
    byId: {},
  },
  once: {
    byId: {},
  },
} as never;

export const Context = createContext<Synced>(initialValue);
const Provider = Context.Provider;

export const SyncedProvider: FC = ({children}) => {
  const context = useContext(Context);

  useLayoutEffect(() => {
    const {all, once, schedule} = context;

    setAll(all);
    setOnce(once);
    setSchedule(schedule);
  }, [context]);

  return <Provider value={context}>{children}</Provider>;
};
