import Landing from './components/pages/landing/Landing/Landing';
import ChangePassword from './components/pages/change-password/ChangePassword/ChangePassword';

export const DEFAULT_PATH = '/';

export default [
  {
    routePath: '/',
    PageComponent: Landing,
  },
  {
    routePath: '/change-password/:email',
    PageComponent: ChangePassword,
  },
];
