import { useState, useEffect } from 'react';

import { paramCase, capitalCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import { getUsers } from '../../../../redux/slices/user';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
// sections
import EmployeeNewEditForm from '../../../../sections/@dashboard/employee/EmployeeNewEditForm';

// ----------------------------------------------------------------------

export default function EmployeeCreate() {
  const { users: userList } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const { themeStretch } = useSettings();

  const { name = '' } = useParams();

  const roles = ['ADMIN', 'EMPLOYEE', 'CUSTOMER'];

  const currentEmployee = userList.find((user) => paramCase(user.name) === name);

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
        <EmployeeNewEditForm currentEmployee={currentEmployee} roles={roles} />
      </Container>
    </Page>
  );
}
