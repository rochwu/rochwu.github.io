import {MutableRefObject} from 'react';

export type AnyFunction = ((...params: any[]) => any) | (() => any);

export type ScheduleCallback = () => void;

export type Schedule = (
  callback: ScheduleCallback,
  options?: {override?: boolean},
) => void;

export type ImmediateOptions = {id?: string | number};
type ImmediateCallbackRef<C extends AnyFunction> = MutableRefObject<C>;

export type Immediate<C extends AnyFunction> = {
  subscribe: (
    callbackRef: ImmediateCallbackRef<C>,
    options?: ImmediateOptions,
  ) => void;
  unsubscribe: (options?: ImmediateOptions) => void;
  run: (options?: ImmediateOptions) => C;
};

export type Synced = {
  schedule: {
    callbacks: ScheduleCallback[];
    subscribe: Schedule;
  };
  all: Immediate<any> & {
    byId: {
      [id: string]: ImmediateCallbackRef<AnyFunction>[];
    };
  };
  once: Immediate<any> & {
    byId: {
      [id: string]: {
        callbackRefs: ImmediateCallbackRef<AnyFunction>[];
        calls: number;
      };
    };
  };
};
