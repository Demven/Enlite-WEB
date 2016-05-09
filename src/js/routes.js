import Landing from './components/pages/landing/Landing/Landing';
import HelloWorld from './components/HelloWorld/HelloWorld';
import TodoApp from './components/TodoApp/TodoApp';

export const DEFAULT_PATH = '/';

export default [
  {
    routePath: '/',
    PageComponent: Landing,
  },
  {
    routePath: '/hello',
    PageComponent: HelloWorld,
  },
  {
    routePath: '/todo',
    PageComponent: TodoApp,
  },
];
