import express, { Express } from 'express';
import * as bodyParser from 'body-parser';
import entries from './routes/entries';
import keywords from './routes/keywords';
import searchVolume from './routes/searchVolumes';
import startDB from './db';

const port = 3000;

function configureApp(app: Express) {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  // Set HTTP-Header
  app.use(function (req, res, next) {

    if (true) {
      res.set('Access-Control-Allow-Origin', req.get('Origin'));
      res.set('Access-Control-Allow-Headers', 'content-type');
    }
    res.set('Set-Cookie', 'SID=xyz; Path=/myapp; Secure; HttpOnly; SameSite=Strict')
    next();

  });
  app.get('/', (req, res) => res.redirect('/entries'));
  app.use('/entries', entries);
  app.use('/keywords', keywords);
  app.use('/searchVolumes', searchVolume);
}

function originAllowed(req: any) {
  if (req.get('Origin').startsWith('http://localhost:')) {
    return true;
  } else {
    return false;
  }
}

async function start() {
  const app = express();
  configureApp(app);
  await startDB(app);
  startHttpServer(app);
}

function startHttpServer(app: Express) {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

start();
