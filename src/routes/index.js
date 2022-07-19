import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import MainLayout from '../layouts/main';
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
import RoleBasedGuard from '../guards/RoleBasedGuard';
// config
import { PATH_AFTER_LOGIN } from '../config';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  const role1 = ['ADMIN'];
  const role2 = ['EMPLOYEE'];
  const role3 = ['CUSTOMER'];
  const role4 = ['ADMIN', 'EMPLOYEE', 'CUSTOMER'];
  const role5 = ['ADMIN', 'CUSTOMER'];
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
      ],
    },
    // Dashboard Routes
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        {
          path: 'task',
          children: [
            { element: <Navigate to="/dashboard/task/list" replace />, index: true },
            {
              path: 'list',
              element: (
                <RoleBasedGuard roles={role4} hasContent>
                  <Tasks />
                </RoleBasedGuard>
              ),
            },
            {
              path: 'new',
              element: (
                <RoleBasedGuard roles={role5} hasContent>
                  <TaskCreate />
                </RoleBasedGuard>
              ),
            },
            {
              path: ':name/edit',
              element: (
                <RoleBasedGuard roles={role5} hasContent>
                  <TaskCreate />
                </RoleBasedGuard>
              ),
            },
          ],
        },
        {
          path: 'bus',
          children: [
            { element: <Navigate to="/dashboard/bus/list" replace />, index: true },
            {
              path: 'list',
              element: (
                <RoleBasedGuard roles={role3} hasContent>
                  <Buses />
                </RoleBasedGuard>
              ),
            },
            {
              path: 'new',
              element: (
                <RoleBasedGuard roles={role3} hasContent>
                  <BusCreate />
                </RoleBasedGuard>
              ),
            },
            {
              path: ':name/edit',
              element: (
                <RoleBasedGuard roles={role3} hasContent>
                  <BusCreate />{' '}
                </RoleBasedGuard>
              ),
            },
          ],
        },
        {
          path: 'driver',
          children: [
            { element: <Navigate to="/dashboard/driver/list" replace />, index: true },
            {
              path: 'list',
              element: (
                <RoleBasedGuard roles={role3} hasContent>
                  <Drivers />
                </RoleBasedGuard>
              ),
            },
            {
              path: 'new',
              element: (
                <RoleBasedGuard roles={role3} hasContent>
                  <DriverCreate />
                </RoleBasedGuard>
              ),
            },
            {
              path: ':name/edit',
              element: (
                <RoleBasedGuard roles={role3} hasContent>
                  <DriverCreate />
                </RoleBasedGuard>
              ),
            },
          ],
        },
        {
          path: 'employee',
          children: [
            { element: <Navigate to="/dashboard/employee/list" replace />, index: true },
            {
              path: 'list',
              element: (
                <RoleBasedGuard roles={role1} hasContent>
                  <Employees />
                </RoleBasedGuard>
              ),
            },
            {
              path: 'new',
              element: (
                <RoleBasedGuard roles={role1} hasContent>
                  <EmployeeCreate />
                </RoleBasedGuard>
              ),
            },
            {
              path: ':name/edit',
              element: (
                <RoleBasedGuard roles={role1} hasContent>
                  <EmployeeCreate />
                </RoleBasedGuard>
              ),
            },
          ],
        },
        {
          path: 'customer',
          children: [
            { element: <Navigate to="/dashboard/customer/list" replace />, index: true },
            {
              path: 'list',
              element: (
                <RoleBasedGuard roles={role1} hasContent>
                  <Customers />
                </RoleBasedGuard>
              ),
            },
            {
              path: 'new',
              element: (
                <RoleBasedGuard roles={role1} hasContent>
                  <CustomerCreate />
                </RoleBasedGuard>
              ),
            },
            {
              path: ':name/edit',
              element: (
                <RoleBasedGuard roles={role1} hasContent>
                  <CustomerCreate />
                </RoleBasedGuard>
              ),
            },
          ],
        },
        {
          path: 'sms',
          element: (
            <RoleBasedGuard roles={role1} hasContent>
              <SmsList />
            </RoleBasedGuard>
          ),
        },
        {
          path: 'profile',
          element: <AccountSetting />,
        },
      ],
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '500', element: <Page500 /> },
        { path: '404', element: <Page404 /> },
        { path: '403', element: <Page403 /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [{ element: <HomePage />, index: true }],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// AUTHENTICATION
const Login = Loadable(lazy(() => import('../pages/auth/Login')));

// DASHBOARD

// User

const AccountSetting = Loadable(lazy(() => import('../pages/dashboard/user/UserAccount')));

// Task
const Tasks = Loadable(lazy(() => import('../pages/dashboard/order/Orders')));
const TaskCreate = Loadable(lazy(() => import('../pages/dashboard/order/OrderCreate')));

// Bus
const Buses = Loadable(lazy(() => import('../pages/dashboard/bus/Buses')));
const BusCreate = Loadable(lazy(() => import('../pages/dashboard/bus/BusCreate')));

// Driver
const Drivers = Loadable(lazy(() => import('../pages/dashboard/driver/Drivers')));
const DriverCreate = Loadable(lazy(() => import('../pages/dashboard/driver/DriverCreate')));

// Employee
const Employees = Loadable(lazy(() => import('../pages/dashboard/user/employee/Employees')));
const EmployeeCreate = Loadable(lazy(() => import('../pages/dashboard/user/employee/EmployeeCreate')));

// Customer
const Customers = Loadable(lazy(() => import('../pages/dashboard/user/customer/Customers')));
const CustomerCreate = Loadable(lazy(() => import('../pages/dashboard/user/customer/CustomerCreate')));

// Sms
const SmsList = Loadable(lazy(() => import('../pages/dashboard/sms/Sms')));

// MAIN
const HomePage = Loadable(lazy(() => import('../pages/Home')));
const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const Page403 = Loadable(lazy(() => import('../pages/Page403')));
const Page404 = Loadable(lazy(() => import('../pages/Page404')));
