export default {
  env: process.env.NODE_ENV || 'production',
  seed: false,
  port: process.env.PORT,
  secrets: {
    expireTime: 24 * 60 * 10,
    jwt: process.env.JWT
  },
  db: {
    url: process.env.MONGODB_URI
  }

}
