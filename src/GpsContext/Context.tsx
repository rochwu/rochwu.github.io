import {createContext, FC, ReactNode, useContext} from 'react';

import {Metadata} from '../types';

type Id = 'main' | 'button' | 'buttonText';

/**
 * Nothing in here causes a render
 */
type Gps = {
  byId: {
    [key: string]: Metadata;
  };
  get(id: Id): Metadata;
  set(id: Id, metadata: Partial<Metadata>): void;
};

const initialValue: Gps = {
  byId: {},
} as never;

const Context = createContext<Gps>(initialValue);
const Provider = Context.Provider;

export const useGps = () => {
  return useContext(Context);
};

export const GpsProvider = ({children}: {children: ReactNode}) => {
  const gps = useGps();
  gps.get = (id) => {
    return gps.byId[id];
  };
  gps.set = (id, metadata) => {
    const state = gps.byId[id];

    gps.byId[id] = {
      ...state,
      ...metadata,
    };
  };

  return <Provider value={gps}>{children}</Provider>;
};
