import HelloWorld from './components/HelloWorld/HelloWorld';
import TodoApp from './components/TodoApp/TodoApp';

export default [
  {
    name: '/',
    PageComponent: HelloWorld,
  },
  {
    name: '/todo',
    PageComponent: TodoApp,
  },
];
