type Callback = () => void;
type Options = {
  override?: boolean;
};

type Schedule = {
  callbacks: Callback[];
  subscribe(callback: Callback, options?: Options): void;
};

export const setSchedule = (): Schedule => {
  let handle: number;
  let isScheduled = false;

  return {
    callbacks: [],
    subscribe(callback, options) {
      this.callbacks.push(callback);

      if (options?.override) {
        clearInterval(handle);
      }

      if (!isScheduled) {
        isScheduled = true;

        handle = window.setTimeout(() => {
          this.callbacks.forEach((callback) => callback());
          this.callbacks = [];
          isScheduled = false;
        }, 333);
      }
    },
  };
};
