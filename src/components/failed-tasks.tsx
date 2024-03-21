import { Task } from "~/repositories/tasks";
import { TasksList } from "./tasks-list";

export async function FailedTasks() {
  const tasks = await Task.getFailed();
  return <TasksList tasks={tasks} />;
}
