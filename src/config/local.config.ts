export default () => ({
  port: parseInt(process.env.PORT, 10) || 4002,
  domain: process.env.DOMAIN_REST || 'http://localhost:4002',
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: 'http://localhost:4002/auth/google/callback',
})
