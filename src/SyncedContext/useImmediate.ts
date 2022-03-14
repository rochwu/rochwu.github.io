import {useCallback, useContext, useRef, useEffect} from 'react';

import {Context} from './Context';
import {ImmediateCallback, ImmediateOptions, Synced} from './types';

const createUseImmediate = (type: keyof Pick<Synced, 'all' | 'once'>) =>
  function useImmediate(
    // TODO: tie the callback better
    callback: ImmediateCallback,
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

    const run = useCallback(
      (...params) => {
        context.run(params, options);
      },
      [context],
    );

    return run;
  };

export const useAll = createUseImmediate('all');
export const useOnce = createUseImmediate('once');
