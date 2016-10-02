import express from 'express';
// import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import render from 'mithril-node-render';
import mithrilRoutes from './routes';
import ThanksPage from './components/pages/Thanks/Thanks';
import ChangePasswordPage from './components/pages/change-password/ChangePassword/ChangePassword';
// import authenticate from './middleware/auth';
import { indexHtmlTemplater, confirmationHtmlTemplater, changePasswordHtmlTemplater } from './services/templates';
import { confirmEmail } from './services/elasticemail';
import { connectMongo } from './db/mongo';
import addAPIv1 from './api/v1';
import addClientAPI from './api/clientAPI';
import validator from 'validator';

const mithrilRenderPlaceholder = '<!-- mithril-server-render-placeholder -->';

connectMongo();

const app = express();

app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 4000);
app.set('ip-address', process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1');

app.use(express.static('build'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());

/* PAGES */
app.get('/change-password/:email', (req, res) => {
  const email = req.params.email;

  if (!validator.isEmail(email)) {
    res.sendStatus(400);
  }

  res.type('html');
  res.end(changePasswordHtmlTemplater(mithrilRenderPlaceholder, render(new ChangePasswordPage({ email }))));
});
app.get('/thanks/:emailname/domain/:emaildomain/*', (req, res) => {
  const email = `${req.params.emailname}@${req.params.emaildomain}`;

  confirmEmail(email);

  res.type('html');
  res.end(confirmationHtmlTemplater(mithrilRenderPlaceholder, render(new ThanksPage(email))));
});

/* render mithril app on server */
mithrilRoutes.forEach(({ routePath, PageComponent }) => {
  app.get(routePath, /* authenticate('enlite', 'enlite2016'), */ (req, res) => {
    res.type('html');
    res.end(indexHtmlTemplater(mithrilRenderPlaceholder, render(new PageComponent())));
  });
});

/* PUBLIC API */
addAPIv1(app);

/* CLIENT API */
addClientAPI(app);

// Just return html file without server rendering
// import TodoApp from './components/TodoApp/TodoApp';
// In such case just comment the lines with configuring express routes
// app.get('/', authenticate('mithril', 'mithril'), (req, res) => {
//    res.sendFile(path.join(__dirname, '../../build/html', 'index.html'));
// });

app.listen(app.get('port'), app.get('ip-address'), () => {
  global.console.info(`Server started on ${app.get('ip-address')}: ${app.get('port')}`);
});
