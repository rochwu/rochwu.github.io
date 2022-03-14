import {Synced} from './types';

export const setOnce = (once: Synced['once']) => {
  once.subscribe = (callbackRef, options) => {
    const id = options?.id || 'default';

    if (!once.byId[id]) {
      once.byId[id] = {callbackRefs: [], calls: 0};
    }

    once.byId[id].callbackRefs.push(callbackRef);
  };

  once.unsubscribe = (options) => {
    const id = options?.id || 'default';

    if (once.byId[id]) {
      delete once.byId[id];
    }
  };

  once.run = (options) => {
    const id = options?.id || 'default';

    return (...args: any[]) => {
      const state = once.byId[id];

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
  };
};
