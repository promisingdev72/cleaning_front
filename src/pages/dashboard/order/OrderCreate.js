import { useEffect, useState } from 'react';

import { paramCase, capitalCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// import useAuth from '../../../hooks/useAuth';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { getAllOrders } from '../../../redux/slices/order';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import OrderNewEditForm from '../../../sections/@dashboard/order/OrderNewEditForm';

// ----------------------------------------------------------------------

export default function OrderCreate() {
  const dispatch = useDispatch();
  // const { user } = useAuth();

  const { themeStretch } = useSettings();

  const { pathname } = useLocation();

  const { name = '' } = useParams();

  const isEdit = pathname.includes('edit');

  const [currentOrder, setCurrentOrder] = useState({});

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const { orders } = useSelector((state) => state.order);

  useEffect(() => {
    if (orders) {
      setCurrentOrder(orders.find((order) => paramCase(order.busNumber) === name));
    }
  }, [orders]);

  return (
    <Page title="Create a new order">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Create a new order' : 'Edit order'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Task', href: PATH_DASHBOARD.task.tasklist },
            { name: !isEdit ? 'New order' : capitalCase(name) },
          ]}
        />

        <OrderNewEditForm isEdit={isEdit} currentOrder={currentOrder} />
      </Container>
    </Page>
  );
}
