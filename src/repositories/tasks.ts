import { type Prisma } from "@prisma/client";
import { type TaskTypes } from "~/features/tasker/tasker";
import { db } from "~/server/db";

const upcomingTasksWhere: Prisma.TaskWhereInput = {
  // Get only tasks that have not succeeded yet
  succeededAt: null,
  // Get only tasks that are scheduled to run for today
  scheduledAt: {
    gt: new Date(new Date().setDate(new Date().getDate() - 1)),
    lt: new Date(new Date().setDate(new Date().getDate() + 1)),
  },
  // Get only tasks where maxAttemps has not been reached
  attempts: {
    lt: {
      // @ts-expect-error prisma is tripping: '_ref' does not exist in type 'FieldRef<"Task", "Int">'
      _ref: "maxAttempts",
      _container: "Task",
    },
  },
};
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
      where: upcomingTasksWhere,
      take: 100,
    });
    return tasks;
  }
  static async getFailed() {
    const tasks = await db.task.findMany({
      where: {
        // Get only tasks where maxAttemps has been reached
        attempts: {
          equals: {
            // @ts-expect-error prisma is tripping: '_ref' does not exist in type 'FieldRef<"Task", "Int">'
            _ref: "maxAttempts",
            _container: "Task",
          },
        },
      },
      take: 10,
    });
    return tasks;
  }
  static async getSucceeded() {
    const tasks = await db.task.findMany({
      where: {
        succeededAt: { not: null },
      },
    });
    return tasks;
  }
  static async count() {
    const tasks = await db.task.count();
    return tasks;
  }
  static async countUpcoming() {
    const tasks = await db.task.count({
      where: upcomingTasksWhere,
    });
    return tasks;
  }
  static async countFailed() {
    const tasks = await db.task.count({
      where: {
        // Get only tasks where maxAttemps has been reached
        attempts: {
          equals: {
            // @ts-expect-error prisma is tripping: '_ref' does not exist in type 'FieldRef<"Task", "Int">'
            _ref: "maxAttempts",
            _container: "Task",
          },
        },
      },
    });
    return tasks;
  }
  static async countSucceeded() {
    const tasks = await db.task.count({
      where: {
        succeededAt: { not: null },
      },
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
  static async succeed(taskId: number) {
    const task = await db.task.update({
      where: {
        id: taskId,
      },
      data: {
        attempts: { increment: 1 },
        succeededAt: new Date(),
      },
    });
    return task;
  }
  static async cleanup() {
    const task = await db.task.deleteMany({
      where: {
        OR: [
          // Get tasks that have succeeded
          { succeededAt: { not: null } },
          // Get tasks where maxAttemps has been reached
          {
            attempts: {
              equals: {
                // @ts-expect-error prisma is tripping: '_ref' does not exist in type 'FieldRef<"Task", "Int">'
                _ref: "maxAttempts",
                _container: "Task",
              },
            },
          },
        ],
      },
    });
    return task.count;
  }
}
