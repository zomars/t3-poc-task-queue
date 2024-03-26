import { Task } from "~/features/tasker/respository";
import { TasksList } from "./tasks-list";

export async function SucceededTasks() {
  const tasks = await Task.getSucceeded();
  return <TasksList tasks={tasks} />;
}
