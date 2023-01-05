export default () => ({
  database: {
    host: process.env.PGHOST,
    port: parseInt(process.env.PGPORT),
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    name: process.env.PGDATABASE,
  },
  auth: {
    test_username: process.env.TEST_USERNAME,
    test_password: process.env.TEST_PASSWORD,
    classeviva: {
      login_endpoint: process.env.CV_LOGIN_ENDPOINT,
      cid: process.env.CV_CID,
      pin: process.env.CV_PIN,
      target: process.env.CV_TARGET,
    },
  },
});
