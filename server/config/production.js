export default {
  env: 'production',
  port: process.env.PORT,
  secrets: {
    jwt: process.env.JWT
  }
}
