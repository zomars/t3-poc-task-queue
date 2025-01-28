import type { NextRequest } from "next/server";
import { env } from "~/env";
import { TaskerFactory } from "../tasker-factory";
import { type Tasker } from "../tasker";

declare global {
  const context: {
    getRemainingTimeInMillis: () => number;
  };
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function safeProcessQueue(tasker: Tasker) {
  try {
    await tasker.processQueue();
  } catch (error) {
    console.error("Error processing queue:", error);
    throw error; // Or handle the error gracefully based on your requirements
  }
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }
  const taskerFactory = new TaskerFactory();
  const tasker = taskerFactory.createTasker();

  // Ensure we leave a buffer (e.g., 1000ms) to return the response before Lambda timeout
  const BUFFER_TIME_MS = 1000;

  while (context.getRemainingTimeInMillis() > BUFFER_TIME_MS) {
    const taskStart = Date.now();
    await safeProcessQueue(tasker);

    // Check if the task duration exceeded the remaining time
    const taskDuration = Date.now() - taskStart;
    if (taskDuration > context.getRemainingTimeInMillis()) {
      console.warn("Task duration exceeded remaining Lambda time");
      break;
    }

    // Add a small delay to avoid excessive CPU usage
    await sleep(100);
  }

  return Response.json({ success: true });
}
