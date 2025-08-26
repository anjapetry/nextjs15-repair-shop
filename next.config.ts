/** @type {import('next').NextConfig} */
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig = {};

// Make sure adding Sentry options is the last code to run before exporting
// When DISABLE_SENTRY_SOURCEMAP_UPLOAD=1 we avoid passing an auth token so
// source-map uploads are effectively disabled.
const sentryAuthToken =
  process.env.DISABLE_SENTRY_SOURCEMAP_UPLOAD === "1"
    ? undefined
    : process.env.SENTRY_AUTH_TOKEN;

export default withSentryConfig(nextConfig, {
  org: "captogether",
  project: "nextjs15-repair-shop",

  // An auth token is required for uploading source maps. Only provide it
  // when uploads are allowed.
  authToken: sentryAuthToken,

  silent: false, // Can be used to suppress logs
  sourcemaps: {
    deleteSourcemapsAfterUpload: true,
  },
  disableLogger: true,
});
