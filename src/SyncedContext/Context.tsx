import {createContext, FC, useContext, useLayoutEffect} from 'react';

import {Synced} from './types';

const initialValue: Synced = {callbacks: []} as never;

export const Context = createContext<Synced>(initialValue);
const Provider = Context.Provider;

export const SyncedProvider: FC = ({children}) => {
  const context = useContext(Context);

  useLayoutEffect(() => {
    let handle: ReturnType<typeof setInterval>; // setInterval in different browsers can be number or string
    let isScheduled = false;

    context.subscribe = (callback) => {
      if (!isScheduled) {
        clearInterval(handle);
        isScheduled = true;

        handle = setInterval(() => {
          context.callbacks.forEach((callback) => callback());
          context.callbacks = [];
          isScheduled = false;
        }, 333);
      }

      context.callbacks.push(callback);
    };

    // eslint-disable-next-line
  }, []);

  return <Provider value={context}>{children}</Provider>;
};
