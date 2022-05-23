import { useEffect, useState } from 'react';
import { paramCase, capitalCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
import useAuth from '../../../hooks/useAuth';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { getBuses } from '../../../redux/slices/bus';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import BusNewEditForm from '../../../sections/@dashboard/bus/BusNewEditForm';

// ----------------------------------------------------------------------

export default function BusCreate() {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const { themeStretch } = useSettings();

  const { pathname } = useLocation();

  const { name = '' } = useParams();

  const isEdit = pathname.includes('edit');

  const [currentBus, setCurrentBus] = useState({});

  useEffect(() => {
    dispatch(getBuses(user.id));
  }, [dispatch]);

  const { buses } = useSelector((state) => state.bus);

  useEffect(() => {
    if (buses) {
      setCurrentBus(buses.find((bus) => paramCase(bus.busNumber) === name));
    }
  }, [buses]);

  return (
    <Page title="Create a new driver">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Create a new driver' : 'Edit driver'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Driver', href: PATH_DASHBOARD.bus.buslist },
            { name: !isEdit ? 'New Bus' : capitalCase(name) },
          ]}
        />

        <BusNewEditForm isEdit={isEdit} currentBus={currentBus} />
      </Container>
    </Page>
  );
}
