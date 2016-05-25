import graphqlHTTP from 'express-graphql';
import graphqlSchema from './schema';
import multer from 'multer';

let upload = multer({inMemory: true});

export default function(app) {
  app.use('/graphql', upload.single('test'), graphqlHTTP((req) => {
    return {
      schema: graphqlSchema,
      graphiql: true,
      rootValue: req // providing req as a rootValue for `resolve()`
    };
  }));
}
