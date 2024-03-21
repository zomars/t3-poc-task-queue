import { Task } from "~/repositories/tasks";
import { TasksList } from "./tasks-list";

export async function SucceededTasks() {
  const tasks = await Task.getSucceeded();
  return <TasksList tasks={tasks} />;
}
