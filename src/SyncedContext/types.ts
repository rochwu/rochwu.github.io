import {MutableRefObject} from 'react';

export type ScheduleCallback = () => void;

export type Schedule = (
  callback: ScheduleCallback,
  options?: {override?: boolean},
) => void;

export type ImmediateOptions = {id?: string | number};
export type ImmediateCallback = (...args: any[]) => void;
type ImmediateCallbackRef = MutableRefObject<ImmediateCallback>;

export type Immediate = {
  subscribe: (
    callbackRef: ImmediateCallbackRef,
    options?: ImmediateOptions,
  ) => void;
  unsubscribe: (options?: ImmediateOptions) => void;
  run: <P>(params: P[], options?: ImmediateOptions) => void;
};

export type Synced = {
  schedule: {
    callbacks: ScheduleCallback[];
    subscribe: Schedule;
  };
  all: Immediate & {
    byId: {
      [key: string]: ImmediateCallbackRef[];
    };
  };
  once: Immediate & {
    byId: {
      [key: string]: {callbackRefs: ImmediateCallbackRef[]; calls: number};
    };
  };
};
