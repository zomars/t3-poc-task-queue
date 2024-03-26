import { Task } from "~/features/tasker/respository";
import { TasksList } from "./tasks-list";

export async function AllTasks() {
  const tasks = await Task.getAll();
  return <TasksList tasks={tasks} />;
}
