import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Task } from "~/repositories/tasks";

export async function UpcomingTasks() {
  const tasks = await Task.getNextBatch();
  return (
    <div className="space-y-8">
      {tasks.map((task) => (
        <div className="flex items-center" key={task.id}>
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>T</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {task.createdAt.toLocaleDateString()}{" "}
              {task.createdAt.toLocaleTimeString()} — {task.type}
            </p>
            <p className="text-muted-foreground text-sm">{task.payload}</p>
          </div>
          <div className="ml-auto font-medium">
            Attempts: {task.attempts} / {task.maxAttempts}
          </div>
        </div>
      ))}
    </div>
  );
}
