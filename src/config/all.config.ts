export default () => ({
  port: parseInt(process.env.PORT, 10) || 4002,
  sentry: {
    dsn: process.env.SENTRY_DSN,
  },
})
