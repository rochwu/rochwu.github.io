import {AnyFunction, CallbackRef, ImmediateOptions as Options} from './types';

type Once<C extends AnyFunction> = {
  byId: {
    [id: string]: {
      callbackRefs: CallbackRef<C>[];
      calls: number;
    };
  };
  subscribe(callbackRef: CallbackRef<C>, options?: Options): void;
  unsubscribe(options?: Options): void;
  run(options?: Options): C;
};

export const setOnce = (): Once<any> => {
  return {
    byId: {},
    subscribe(callbackRef, options) {
      const id = options?.id || 'default';

      if (!this.byId[id]) {
        this.byId[id] = {callbackRefs: [], calls: 0};
      }

      this.byId[id].callbackRefs.push(callbackRef);
    },
    unsubscribe(options) {
      const id = options?.id || 'default';

      if (this.byId[id]) {
        delete this.byId[id];
      }
    },
    run(options) {
      const id = options?.id || 'default';

      return (...args: any[]) => {
        const state = this.byId[id];

        // If the state is a one time event instead of periodic,
        // not resetting should be fine
        // TODO: Keep an eye on this
        if (state.calls === 0) {
          state.callbackRefs[0].current(...args);
        }

        state.calls += 1;

        if (state.calls >= state.callbackRefs.length) {
          state.calls = 0;
        }
      };
    },
  };
};
