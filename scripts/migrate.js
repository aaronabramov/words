require('babel-register');

var path = require('path');
var config = require('../application_config').default;

require('sql-migrations').run({
  basedir: path.resolve(__dirname, '../'),
  migrationsDir: path.resolve(__dirname, '../migrations'),
  user: config.postgresUser,
  host: config.postgresHost,
  password: config.postgresPassword,
  db: config.postgresDb
});
