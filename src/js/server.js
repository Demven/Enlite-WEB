import express from 'express';
// import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import render from 'mithril-node-render';
import routes from './routes';
import Thanks from './components/Thanks/Thanks';
import authenticate from './middleware/auth';
import { indexHtmlTemplater, confirmationHtmlTemplater } from './services/templates';
import { addContact, confirmEmail } from './services/elasticemail';
import pageData from './data/landing';

const mithrilRenderPlaceholder = '<!-- mithril-server-render-placeholder -->';

const app = express();

app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 4000);
app.set('ip-address', process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1');

app.use(express.static('build'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());

app.get('/thanks/:emailname/domain/:emaildomain/*', (req, res) => {
  const email = `${req.params.emailname}@${req.params.emaildomain}`;

  confirmEmail(email);

  res.type('html');
  res.end(confirmationHtmlTemplater(mithrilRenderPlaceholder, render(new Thanks(email))));
});

app.get('/addcontact/:email', (req, res) => {
  addContact(req.params.email);
  res.sendStatus(200);
});

// render mithril app on server
routes.forEach(({ routePath, PageComponent }) => {
  app.get(routePath, authenticate('enlite', 'enlite2016'), (req, res) => {
    res.type('html');
    res.end(indexHtmlTemplater(mithrilRenderPlaceholder, render(new PageComponent(pageData))));
  });
});

// Just return html file without server rendering
// import TodoApp from './components/TodoApp/TodoApp';
// In such case just comment the lines with configuring express routes
// app.get('/', authenticate('mithril', 'mithril'), (req, res) => {
//    res.sendFile(path.join(__dirname, '../../build/html', 'index.html'));
// });

app.listen(app.get('port'), app.get('ip-address'), () => {
  console.log(`Server started on ${app.get('ip-address')}: ${app.get('port')}`);
});
