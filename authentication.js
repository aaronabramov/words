import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import config from './application_config';
import {makePgConString} from './utils';
import passport from 'passport';
import {Strategy as FacebookStrategy} from 'passport-facebook';
import pg from 'pg';
import {query} from './db';

let PgSession = connectPgSimple(session);

export default function(app) {
  app.use(session({
    store: new PgSession({
      pg: pg,
      conString: makePgConString({
        user: config.postgresUser,
        password: config.postgresPassword,
        host: config.postgresHost,
        db: config.postgresDb
      }),
      tableName: 'sessions'
    }),
    secret: config.authSecret,
    cookie: {maxAge: 30 * 24 * 60 * 60 * 1000} // 30 days
  }));

  passport.serializeUser((user, done) => {
    done(null, user.facebookId);
  });

  passport.deserializeUser((id, done) => {
    query('select * from users where facebook_id = $1', [id]).then((result) => {
      let row = result.rows[0];
      let user = {
        accessToken: row.access_token,
        refreshToken: row.refresh_token,
        facobookId: row.facebook_id,
        displayName: row.display_name
      };

      done(null, user);
    }).catch(done);
  });

  passport.use(new FacebookStrategy({
    clientID: config.fbClientId,
    clientSecret: config.fbSecret,
    callbackURL: config.fbCallbackUrl
  }, (accessToken, refreshToken, profile, done) => {
    let user = {
      accessToken,
      refreshToken,
      facebookId: profile.id,
      displayName: profile.displayName
    };

    query('select * from users where facebook_id = $1', [profile.id]).then((result) => {
      // if there is already a user record for this id
      if (result.rows.length) {
        return query(`
          update users set
            access_token = $1,
            refresh_token = $2,
            display_name = $3
          where facebook_id = $4
          `,
          [user.accessToken, user.refreshToken, user.displayName, user.facebookId]
        );
      } else {
        // create a new one
        return query(
          `insert into users (access_token, refresh_token, display_name, facebook_id)
           values ($1, $2, $3, $4)`,
           [user.accessToken, user.refreshToken, user.displayName, user.facebookId]
        );
      }
    }).then(() => done(null, user)).catch(done);
  }));

  // Should be added after `app.use(session)`
  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/auth/facebook', passport.authenticate('facebook'));
  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));
};
