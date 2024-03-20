import type { NextRequest } from "next/server";
import { env } from "~/env";
import { TaskerFactory } from "../tasker-factory";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }
  const taskerFactory = new TaskerFactory();
  const tasker = taskerFactory.createTasker();
  await tasker.processQueue();
  return Response.json({ success: true });
}
