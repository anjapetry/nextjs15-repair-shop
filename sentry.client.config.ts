import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://07ad6d97c843cc48036febee2dfcaf8c@o4508184165416960.ingest.de.sentry.io/4508184186454096",
  skipOpenTelemetrySetup: true,
  ignoreErrors: [/^NEXT_REDIRECT$/],

  // Replay may only be enabled for the client-side
  integrations: [Sentry.replayIntegration()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for tracing.
  // We recommend adjusting this value in production
  tracesSampleRate: 1,

  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 0.2,

  // ...

  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});
