import m from 'mithril';
import routes, { DEFAULT_PATH } from './routes';

// configure client router
m.route.mode = 'pathname';

// use the same routes as for express app
const mithrilRoutes = {};
routes.forEach(({ routePath, PageComponent }) => {
  mithrilRoutes[routePath] = new PageComponent();
});

m.route(document.getElementById('content'), DEFAULT_PATH, mithrilRoutes);
