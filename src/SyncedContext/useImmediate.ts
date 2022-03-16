import {useCallback, useContext, useRef, useEffect} from 'react';

import {Context} from './Context';
import {AnyFunction, ImmediateOptions, Synced} from './types';

const createUseImmediate = (type: keyof Pick<Synced, 'all' | 'once'>) =>
  function useImmediate<C extends AnyFunction>(
    callback: C,
    options?: ImmediateOptions,
  ) {
    const context = useContext(Context)[type];

    const callbackRef = useRef(callback);
    callbackRef.current = callback;

    useEffect(() => {
      context.subscribe(callbackRef, options);

      return () => {
        context.unsubscribe(options);
      };
    }, [context]);

    const run = useCallback<typeof callback>(context.run(options), [context]);

    return run;
  };

export const useAll = createUseImmediate('all');
export const useOnce = createUseImmediate('once');
