
import pg from 'pg';
import chalk from 'chalk';
import config from '../application_config';
import {makePgConString} from '../utils';
const DEBUG = true;

let {postgresUser, postgresHost, postgresPassword, postgresDb} = config;
let conString = makePgConString({user: postgresUser, host: postgresHost, password: postgresPassword, db: postgresDb});

/**
 * Make a db query using current connection string (based on environment)
 *
 * @param {String} text sql query
 * @param {Array} values sql values
 *
 * @example
 *  query('select $1 from $2 limit $3', ['id', 'users', 6]);
 * @return {Promise}
 */
export const query = (text, values) => {
  return new Promise((resolve, reject) => {
    pg.connect(conString, (connectionErr, client, release) => {
      if (connectionErr) {
        return reject(connectionErr);
      }

      if (DEBUG) {
        console.log(chalk.red('========================================'));
        console.log(chalk.blue('=> SQL:'), chalk.green(text));
        console.log(chalk.blue('=> values: '), chalk.green((values || '').toString()));
        console.log(chalk.red('========================================='));
      }

      client.query(text, values, (queryError, result) => {
        // release the connection
        release();

        if (queryError) {
          return reject(queryError);
        }

        resolve(result);
      });
    });
  });
};

export {query};
