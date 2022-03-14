import {createContext, FC, useContext, useRef} from 'react';

import {useWillMount} from '../useWillMount';

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

  useWillMount(() => {
    const {all, once, schedule} = context;

    setAll(all);
    setOnce(once);
    setSchedule(schedule);
  });

  return <Provider value={context}>{children}</Provider>;
};
