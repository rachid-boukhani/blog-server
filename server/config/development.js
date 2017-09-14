export default {
  env: 'production',
  port: process.env.PORT,
  expireTime: 24 * 60 * 10,
  secrets: {
    jwt: process.env.JWT || 'gumball'
  }
}
