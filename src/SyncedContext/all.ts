import {CallbackRef, AnyFunction, ImmediateOptions as Options} from './types';

type All<C extends AnyFunction> = {
  byId: {
    [id: string]: CallbackRef<C>[];
  };
  subscribe(callbackRef: CallbackRef<C>, options?: Options): void;
  unsubscribe(options?: Options): void;
  run(options?: Options): C;
};

export const setAll = (): All<any> => {
  return {
    byId: {},
    subscribe(callbackRef, options) {
      const id = options?.id || 'default';

      const previous = this.byId[id];

      if (previous) {
        previous.push(callbackRef);
      } else {
        this.byId[id] = [callbackRef];
      }
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
        this.byId[id]?.forEach(({current: callback}) => {
          callback(...args);
        });
      };
    },
  };
};
