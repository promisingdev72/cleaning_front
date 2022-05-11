// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  user: getIcon('ic_user'),
  dashboard: getIcon('ic_dashboard'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'Dashboard',
    items: [
      { title: 'Order List', path: PATH_DASHBOARD.order.orderlist, icon: ICONS.dashboard },
      { title: 'Employee List', path: PATH_DASHBOARD.employee.employeelist, icon: ICONS.dashboard },
      { title: 'Customer List', path: PATH_DASHBOARD.customer.customerlist, icon: ICONS.dashboard },
    ],
  },
];

export default navConfig;
