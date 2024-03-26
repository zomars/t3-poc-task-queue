import { Task } from "~/features/tasker/respository";
import { TasksList } from "./tasks-list";

export async function UpcomingTasks() {
  const tasks = await Task.getNextBatch();
  return <TasksList tasks={tasks} />;
}
