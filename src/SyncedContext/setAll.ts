import {Synced} from './types';

export const setAll = (all: Synced['all']) => {
  all.subscribe = (callbackRef, options) => {
    const id = options?.id || 'default';

    const previous = all.byId[id];

    if (previous) {
      previous.push(callbackRef);
    } else {
      all.byId[id] = [callbackRef];
    }
  };

  all.unsubscribe = (options) => {
    const id = options?.id || 'default';

    if (all.byId[id]) {
      delete all.byId[id];
    }
  };

  all.run = (args: any[], options) => {
    const id = options?.id || 'default';

    all.byId[id]?.forEach(({current: callback}) => {
      callback(...args);
    });
  };
};
