const config = require('./config/config');
const path = require('path');
module.exports = {
    development: {
      client: 'mysql',
      connection: {
        host: config.database.host,
        user: config.database.user,
        password: config.database.password,
        database: config.database.database,
      },
      migrations: {
        directory: path.join(__dirname, 'database', 'migrations'),
      },
      seeds: {
        directory: path.join(__dirname, 'database', 'seeds'),
      },
    },
  };
  