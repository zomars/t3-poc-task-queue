import { Task } from "~/repositories/tasks";
import { TasksList } from "./tasks-list";

export async function UpcomingTasks() {
  const tasks = await Task.getNextBatch();
  return <TasksList tasks={tasks} />;
}
