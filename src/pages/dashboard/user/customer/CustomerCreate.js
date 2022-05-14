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
// _mock_
import { _userList } from '../../../../_mock';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
// sections
import CustomerNewEditForm from '../../../../sections/@dashboard/customer/CustomerNewEditForm';

// ----------------------------------------------------------------------

export default function CustomerCreate() {
  const dispatch = useDispatch();

  const { themeStretch } = useSettings();

  const { pathname } = useLocation();

  const { name = '' } = useParams();

  const isEdit = pathname.includes('edit');

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const { users } = useSelector((state) => state.user);

  const currentCustomer = users.find((user) => paramCase(user.name) === name);

  return (
    <Page title="Create a new customer">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Create a new customer' : 'Edit customer'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Customer', href: PATH_DASHBOARD.customer.customerlist },
            { name: !isEdit ? 'New customer' : capitalCase(name) },
          ]}
        />

        <CustomerNewEditForm isEdit={isEdit} currentCustomer={currentCustomer} />
      </Container>
    </Page>
  );
}
