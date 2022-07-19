// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  user: getIcon('ic_user'),
  dashboard: getIcon('ic_dashboard'),
  sms: getIcon('ic_sms'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'Dashboard',
    items: [
      { title: 'Tasks', path: PATH_DASHBOARD.task.tasklist, icon: ICONS.dashboard },
      { title: 'Manage Bus List', path: PATH_DASHBOARD.bus.buslist, icon: ICONS.dashboard },
      { title: 'Manage Driver List', path: PATH_DASHBOARD.driver.driverlist, icon: ICONS.user },
      { title: 'Employees', path: PATH_DASHBOARD.employee.employeelist, icon: ICONS.user },
      { title: 'Customers', path: PATH_DASHBOARD.customer.customerlist, icon: ICONS.user },
      { title: 'SMS', path: PATH_DASHBOARD.sms.smslist, icon: ICONS.sms },
    ],
  },
];

export default navConfig;
