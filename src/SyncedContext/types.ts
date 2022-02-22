export type SyncedCallback = () => void;

export type Schedule = (syncedCallback: () => void) => void;

export type Synced = {
  callbacks: SyncedCallback[];
  subscribe: Schedule;
};
