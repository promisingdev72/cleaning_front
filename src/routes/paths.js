// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  newPassword: path(ROOTS_AUTH, '/new-password'),
};

export const PATH_PAGE = {
  page403: '/403',
  page404: '/404',
  page500: '/500',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  order: {
    orderlist: path(ROOTS_DASHBOARD, '/order'),
    new: path(ROOTS_DASHBOARD, '/order/new'),
    edit: (name) => path(ROOTS_DASHBOARD, `/order/${name}/edit`),
  },
  bus: {
    buslist: path(ROOTS_DASHBOARD, '/bus'),
    new: path(ROOTS_DASHBOARD, '/bus/new'),
    edit: (name) => path(ROOTS_DASHBOARD, `/bus/${name}/edit`),
  },
  employee: {
    employeelist: path(ROOTS_DASHBOARD, '/employee'),
    new: path(ROOTS_DASHBOARD, '/employee/new'),
  },
  customer: {
    customerlist: path(ROOTS_DASHBOARD, '/customer'),
    new: path(ROOTS_DASHBOARD, '/customer/new'),
    edit: (name) => path(ROOTS_DASHBOARD, `/customer/${name}/edit`),
  },
  permissionDenied: path(ROOTS_DASHBOARD, '/permission-denied'),
  user: {
    profile: path(ROOTS_DASHBOARD, '/profile'),
  },
};
