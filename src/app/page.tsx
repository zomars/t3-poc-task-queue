import { type Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

import { AllTasks } from "~/components/all-tasks";
import { FailedTasks } from "~/components/failed-tasks";
import NewTaskButton from "~/components/new-task-button";
import { SucceededTasks } from "~/components/succeeded-tasks";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { UpcomingTasks } from "~/components/upcoming-tasks";
import { Task } from "~/repositories/tasks";
export const metadata: Metadata = {
  title: "Dashboard",
  description: "Task management dashboard.",
};

export default async function DashboardPage() {
  const taskCount = await Task.count();
  const upcomingTaskCount = await Task.countUpcoming();
  const failedTaskCount = await Task.countFailed();
  const succeededTaskCount = await Task.countSucceeded();
  return (
    <>
      <div className="flex flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
              <NewTaskButton />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{taskCount}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Upcoming Tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{upcomingTaskCount}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Failed tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{failedTaskCount}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Succeeded tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{succeededTaskCount}</div>
              </CardContent>
            </Card>
          </div>
          <Tabs defaultValue="upcoming" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="failed">Failed</TabsTrigger>
              <TabsTrigger value="succeeded">Succeeded</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-7">
                  <CardHeader>
                    <CardTitle>All Tasks</CardTitle>
                    <CardDescription>
                      You have {taskCount} tasks.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AllTasks />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="upcoming" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-7">
                  <CardHeader>
                    <CardTitle>Upcoming Tasks</CardTitle>
                    <CardDescription>
                      You have {upcomingTaskCount} pending tasks.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <UpcomingTasks />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="failed" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-7">
                  <CardHeader>
                    <CardTitle>Failed Tasks</CardTitle>
                    <CardDescription>
                      You have {failedTaskCount} failed tasks.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FailedTasks />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="succeeded" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-7">
                  <CardHeader>
                    <CardTitle>Succeded Tasks</CardTitle>
                    <CardDescription>
                      You have {succeededTaskCount} succeded tasks.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <SucceededTasks />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
