export default () => ({
  database: {
    host: process.env.PGHOST,
    port: parseInt(process.env.PGPORT),
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    name: process.env.PGDATABASE,
  },
});
