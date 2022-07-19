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
};

export const PATH_PAGE = {
  page403: '/403',
  page404: '/404',
  page500: '/500',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  task: {
    tasklist: path(ROOTS_DASHBOARD, '/task'),
    new: path(ROOTS_DASHBOARD, '/task/new'),
    edit: (name) => path(ROOTS_DASHBOARD, `/task/${name}/edit`),
  },
  bus: {
    buslist: path(ROOTS_DASHBOARD, '/bus'),
    new: path(ROOTS_DASHBOARD, '/bus/new'),
    edit: (name) => path(ROOTS_DASHBOARD, `/bus/${name}/edit`),
  },
  driver: {
    driverlist: path(ROOTS_DASHBOARD, '/driver'),
    new: path(ROOTS_DASHBOARD, '/driver/new'),
    edit: (name) => path(ROOTS_DASHBOARD, `/driver/${name}/edit`),
  },
  employee: {
    employeelist: path(ROOTS_DASHBOARD, '/employee'),
    new: path(ROOTS_DASHBOARD, '/employee/new'),
    edit: (name) => path(ROOTS_DASHBOARD, `/employee/${name}/edit`),
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
  sms: {
    smslist: path(ROOTS_DASHBOARD, '/sms'),
  },
};
