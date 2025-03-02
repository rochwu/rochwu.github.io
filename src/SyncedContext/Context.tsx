import {createContext, ReactNode, useContext} from 'react';

import {setAll} from './all';
import {setOnce} from './once';
import {setSchedule} from './schedule';

const initialValue = {
  schedule: setSchedule(),
  once: setOnce(),
  all: setAll(),
};

export type Synced = typeof initialValue;

export const Context = createContext(initialValue);
const Provider = Context.Provider;

export const SyncedProvider = ({children}: {children: ReactNode}) => {
  const context = useContext(Context);

  return <Provider value={context}>{children}</Provider>;
};
