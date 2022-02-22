export type SyncedCallback = () => void;

type ScheduleOptions = {
  override?: boolean;
};
export type Schedule = (
  syncedCallback: () => void,
  options?: ScheduleOptions,
) => void;

export type Synced = {
  callbacks: SyncedCallback[];
  subscribe: Schedule;
};
