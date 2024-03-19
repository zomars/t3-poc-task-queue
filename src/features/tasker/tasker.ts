export type TaskerTypes = "internal" | "redis";
export type TaskTypes = "sendEmail";
export interface Tasker {
  /** Create a new task with the given type and payload. */
  create(type: string, payload: string): Promise<void>;
  processQueue(): Promise<void>;
}
