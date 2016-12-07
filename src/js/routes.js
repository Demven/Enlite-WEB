import Landing from './components/pages/landing/Landing/Landing';
import ChangePassword from './components/pages/change-password/ChangePassword/ChangePassword';
import TermsAndPolicy from './components/pages/TermsAndPolicy/TermsAndPolicy';

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
  {
    routePath: '/terms-and-policy',
    PageComponent: TermsAndPolicy,
  },
];
