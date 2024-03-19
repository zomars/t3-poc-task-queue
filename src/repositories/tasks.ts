import { type TaskTypes } from "~/features/tasker/tasker";
import { db } from "~/server/db";

export class Task {
  static async create(type: TaskTypes, payload: string) {
    const newTask = await db.task.create({
      data: {
        payload,
        type,
      },
    });
    return newTask;
  }
  static async getNextBatch() {
    const tasks = await db.task.findMany({
      where: {
        attempts: {
          /** Get only tasks where attempts is less than maxAttemps */
          lt: {
            isList: false,
            modelName: "Task",
            name: "maxAttempts",
            typeName: "Int",
          },
        },
      },
      take: 10,
    });
    return tasks;
  }
  static async retry(taskId: number, lastError?: string) {
    const task = await db.task.update({
      where: {
        id: taskId,
      },
      data: {
        attempts: { increment: 1 },
        lastError,
      },
    });
    return task;
  }
}
