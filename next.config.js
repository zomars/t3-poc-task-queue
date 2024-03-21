/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

if (process.env.NODE_ENV === "development") {
  const main = await import("./cron-tester.js").then((m) => m.main);
  main();
}

/** @type {import("next").NextConfig} */
const config = {};

export default config;
