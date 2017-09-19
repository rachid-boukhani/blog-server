export default {
  env: process.env.NODE_ENV || 'development',
  seed: true,
  secrets: {
    expireTime: 24 * 60 * 10,
    jwt: process.env.JWT || 'gumball'
  },
  db: {
    url: 'mongodb://localhost/nodeblog'
  }
}
