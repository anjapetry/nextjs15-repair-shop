import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://07ad6d97c843cc48036febee2dfcaf8c@o4508184165416960.ingest.de.sentry.io/4508184186454096",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for tracing.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,

  // ...

  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});
