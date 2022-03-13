import {Synced} from './types';

export const setSchedule = (schedule: Synced['schedule']) => {
  let handle: number;
  let isScheduled = false;

  schedule.subscribe = (callback, options) => {
    schedule.callbacks.push(callback);

    if (options?.override) {
      clearInterval(handle);
    }

    if (!isScheduled) {
      isScheduled = true;

      handle = window.setTimeout(() => {
        schedule.callbacks.forEach((callback) => callback());
        schedule.callbacks = [];
        isScheduled = false;
      }, 333);
    }
  };
};
