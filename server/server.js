import express from 'express';
// import fs from 'fs';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import render from 'mithril-node-render';
import authenticate from './utils/auth';
import TodoApp from './components/TodoApp/TodoApp';

const app = express();

app.set('trust proxy', true);
app.set('x-powered-by', false);
app.set('port', process.env.PORT || 4000);

/* var httpsOptions = {
 key: fs.readFileSync(path.join(__dirname, 'ssl/server.key')),
 cert: fs.readFileSync(path.join(__dirname, 'ssl/server.crt'))
 }; */

app.use(express.static('build'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());


// Routes
/*app.get('/', authenticate('enlite', 'enlite2016'), (req, res) => {
  res.sendFile(path.join(__dirname, '../../build/html', 'index.html'));
});*/

function base(mainComponent){
  return '' +
    '<!DOCTYPE html>' +
    '<html lang="en">' +
    '<head>' +
      '<meta charset="UTF-8">' +
      '<title>Learn Mithril</title>' +
      '<link rel="stylesheet" href="/css/bundle.css">' +
    '</head>' +

      '<body>' +
        '<main id="content">' +
          mainComponent +
        '</main>' +

        '<script src="/js/bundle.js"></script>' +
      '</body>' +
    '</html>';
}

app.get('/', (req, res) => {
  res.end(base(render(new TodoApp({ paramOne: 'ToDo', paramTwo: 'App' }))));
});

app.listen(app.get('port'));
// https.createServer(httpsOptions, app).listen(443);
console.info('Server started on localhost: 4000');
