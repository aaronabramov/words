import express from 'express';
import path from 'path';
import fs from 'fs';
import setupAuthentication from './authentication';
import ejs from 'ejs';
import setupGraphQLMiddleware from './graphql/setup_middleware';
import morgan from 'morgan';

let app = express();
// the initial static html page
let applicationHtmlTemplate = fs.readFileSync('./client/index.html.ejs').toString();
let dashboardHtmlTemplate = fs.readFileSync('./client/dashboard.html.ejs').toString();

// logging
app.use(morgan('tiny'));

// All files inside public/ are publicly accessible
app.use(express.static(path.resolve(__dirname, './public')));

setupAuthentication(app);

app.get('/', (req, res) => {
  let applicationData = {
    user: req.user
  };

  res.set('Content-Type', 'text/html');
  res.send(ejs.render(applicationHtmlTemplate, {
    applicationData: JSON.stringify(applicationData)
  }));
});

setupGraphQLMiddleware(app);

export default app;
