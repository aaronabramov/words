/**
 * Make a pg con string (postgres://user:pass@host/db type) out of given data
 */
export function makePgConString({user, password, host, db}) {
  let conString = 'postgres://';

  if (user) {
    conString += user;
  }

  if (password) {
    conString += `:${password}`;
  }

  if (user || password) {
    conString += '@';
  }

  conString += `${host}/${db}`;

  return conString;
}
