import {createContext, FC, useContext, useLayoutEffect} from 'react';

import {Synced} from './types';

const initialValue: Synced = {callbacks: []} as never;

export const Context = createContext<Synced>(initialValue);
const Provider = Context.Provider;

export const SyncedProvider: FC = ({children}) => {
  const context = useContext(Context);

  useLayoutEffect(() => {
    let handle: number;
    let isScheduled = false;

    context.subscribe = (callback, options) => {
      context.callbacks.push(callback);

      if (options?.override) {
        clearInterval(handle);
      }

      if (!isScheduled) {
        isScheduled = true;

        handle = window.setTimeout(() => {
          context.callbacks.forEach((callback) => callback());
          context.callbacks = [];
          isScheduled = false;
        }, 333);
      }
    };

    // eslint-disable-next-line
  }, []);

  return <Provider value={context}>{children}</Provider>;
};
