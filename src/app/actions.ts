"use server";

import { revalidatePath } from "next/cache";
import { TaskerFactory } from "~/features/tasker/tasker-factory";

export async function createTask() {
  const taskerFactory = new TaskerFactory();
  const tasker = taskerFactory.createTasker();
  await tasker.create(
    "sendEmail",
    JSON.stringify({
      template: "organizerRequestEmail",
      to: "email@example.com",
    }),
  );
  revalidatePath("/");
}

export async function cleanTasks() {
  const taskerFactory = new TaskerFactory();
  const tasker = taskerFactory.createTasker();
  await tasker.cleanup();
  revalidatePath("/");
}
