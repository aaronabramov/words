import express from 'express';
import path from 'path';
import fs from 'fs';
import ejs from 'ejs';
import morgan from 'morgan';

let app = express();
// the initial static html page
let applicationHtmlTemplate = fs.readFileSync('./client/index.html.ejs').toString();

// logging
app.use(morgan('tiny'));

// All files inside public/ are publicly accessible
app.use(express.static(path.resolve(__dirname, './public')));

app.get('/', (req, res) => {
  let applicationData = {
    user: req.user
  };

  res.set('Content-Type', 'text/html');
  res.send(ejs.render(applicationHtmlTemplate, {
    applicationData: JSON.stringify(applicationData)
  }));
});

export default app;
