import {MutableRefObject} from 'react';

export type AnyFunction = ((...params: any[]) => any) | (() => any);

export type ImmediateOptions = {id?: string};

export type CallbackRef<C extends AnyFunction> = MutableRefObject<C>;
