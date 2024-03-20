import { TaskerFactory } from "~/features/tasker/tasker-factory";

export default function HomePage() {
  async function createTask() {
    "use server";
    const taskerFactory = new TaskerFactory();
    const tasker = taskerFactory.createTasker();
    await tasker.create(
      "sendEmail",
      JSON.stringify({
        template: "organizerRequestEmail",
        to: "email@example.com",
      }),
    );
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <form action={createTask}>
            <button
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              type="submit"
            >
              <div className="text-lg">
                Click me to create a task that sends an email.
              </div>
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
