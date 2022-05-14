// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
// sections
import EmployeeNewEditForm from '../../../../sections/@dashboard/employee/EmployeeNewEditForm';

// ----------------------------------------------------------------------

export default function EmployeeCreate() {
  const { themeStretch } = useSettings();
  return (
    <Page title="Create a new employee">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={'Create a new employee'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Employee', href: PATH_DASHBOARD.employee.employeelist },
            { name: 'New employee' },
          ]}
        />
        <EmployeeNewEditForm />
      </Container>
    </Page>
  );
}
