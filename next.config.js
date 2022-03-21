const withPWA = require('next-pwa')

module.exports = withPWA({
  swcMinify: true,
  pwa: {
    dest: 'public',
    buildExcludes: [/middleware-manifest\.json$/],
  },
  env: {
    DB_URI:
      ' mongodb+srv://manish86:manish86@cluster0.cal8e.mongodb.net/bindrr?retryWrites=true&w=majority',
    GOOGLE_ID:
      '660077694108-5g582clqdkft28a6qae601ooc9vdd338.apps.googleusercontent.com',
    GOOGLE_SECRET: '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',
    NEXTAUTH_URL: 'http://localhost:4040',
    JWT_SECRET: 'hellofem',
    MSG_KEY: 'NDgzNTM1NTk2NzRiNmQ0ZjY4MzQ0MjZmNzMzNDMyNzY=',
    FACEBOOK_ID: '705480860861473',
    FACEBOOK_SECRET: 'c2b04a0cf3843e466b98ed7b73c22128',
  },
  images: {
    domains: ['ecommerce-images.s3.ap-south-1.amazonaws.com'],
  },
})
