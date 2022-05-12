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
  },
  employee: {
    employeelist: path(ROOTS_DASHBOARD, '/employee'),
    new: path(ROOTS_DASHBOARD, '/employee/new'),
  },
  customer: {
    customerlist: path(ROOTS_DASHBOARD, '/customer'),
    new: path(ROOTS_DASHBOARD, '/customer/new'),
  },
  permissionDenied: path(ROOTS_DASHBOARD, '/permission-denied'),
  // user: {
  //   root: path(ROOTS_DASHBOARD, '/user'),
  //   new: path(ROOTS_DASHBOARD, '/user/new'),
  //   list: path(ROOTS_DASHBOARD, '/user/list'),
  //   profile: path(ROOTS_DASHBOARD, '/user/profile'),
  //   account: path(ROOTS_DASHBOARD, '/user/account'),
  //   edit: (name) => path(ROOTS_DASHBOARD, `/user/${name}/edit`),
  //   demoEdit: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
  // },
};
