import { CronJob } from "cron";

/**
 *
 * @param {string} endpoint
 * @returns
 */
function fetchCron(endpoint) {
  return fetch(`http://localhost:3000/api/tasks/${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${process.env.CRON_SECRET}`,
    },
  })
    .then((res) => res.json())
    .then((json) => console.log(endpoint, json));
}

export function main() {
  new CronJob(
    "5 * * * * *",
    async function () {
      await Promise.allSettled([
        fetchCron("cron"),
        //
        // fetchCron("cleanup"),
      ]);
    },
    null,
    true,
    "America/Los_Angeles",
  );
}
