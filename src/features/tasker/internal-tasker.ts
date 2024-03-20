import { Task } from "~/repositories/tasks";
import { type TaskTypes, type Tasker } from "./tasker";
import tasksMap from "./tasks";

/**
 * This is the default internal Tasker that uses the Task repository to create tasks.
 * It doens't have any external dependencies and is suitable for most use cases.
 * To use a different Tasker, you can create a new class that implements the Tasker interface.
 * Then, you can use the TaskerFactory to select the new Tasker.
 */
export class InternalTasker implements Tasker {
  async create(type: TaskTypes, payload: string): Promise<void> {
    await Task.create(type, payload);
  }
  async processQueue(): Promise<void> {
    const tasks = await Task.getNextBatch();

    const tasksPromises = tasks.map(async (task) => {
      const taskHandler = await tasksMap[task.type as keyof typeof tasksMap];
      return taskHandler(task.payload)
        .then(async () => {
          await Task.succeed(task.id);
        })
        .catch(async (error) => {
          await Task.retry(
            task.id,
            error instanceof Error ? error.message : "Unknown error",
          );
        });
    });
    const settled = await Promise.allSettled(tasksPromises);
    const failed = settled.filter((result) => result.status === "rejected");
    const succeded = settled.filter((result) => result.status === "fulfilled");
    console.info({ failed, succeded });
  }
}
