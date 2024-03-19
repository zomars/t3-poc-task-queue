import type { QueueOptions } from "bull";
import Bull from "bull";
import { type TaskTypes, type Tasker } from "./tasker";

/**
 * RedisTasker is a tasker that uses Redis as a backend.
 * It uses Bull as a library to manage the queue.
 * WIP: This is a work in progress and is not fully implemented yet.
 **/
export class RedisTasker implements Tasker {
  options: QueueOptions;
  constructor() {
    this.options = {
      redis: process.env.REDIS_URL,
      settings: {
        lockDuration: 10000,
      },
    };
  }
  async create(type: TaskTypes, payload: string): Promise<void> {
    const newTask = new Bull(type, this.options);
    await newTask.process(function (job, done) {
      try {
        // Send email
        done();
      } catch (error) {
        console.error("Error processing task", error);
      }
    });
    await newTask.add(payload);
  }
  processQueue(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
