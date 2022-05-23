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
import { getDrivers } from '../../../redux/slices/driver';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import DriverNewEditForm from '../../../sections/@dashboard/driver/DriverNewEditForm';

// ----------------------------------------------------------------------

export default function DriverCreate() {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const { themeStretch } = useSettings();

  const { pathname } = useLocation();

  const { name = '' } = useParams();

  const isEdit = pathname.includes('edit');

  const [currentDriver, setCurrentDriver] = useState({});

  useEffect(() => {
    dispatch(getDrivers(user.id));
  }, [dispatch]);

  const { drivers } = useSelector((state) => state.driver);

  useEffect(() => {
    if (drivers) {
      setCurrentDriver(drivers.find((driver) => paramCase(driver.driverName) === name));
    }
  }, [drivers]);

  return (
    <Page title="Create a new driver">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Create a new driver' : 'Edit driver'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Driver', href: PATH_DASHBOARD.driver.driverlist },
            { name: !isEdit ? 'New Driver' : capitalCase(name) },
          ]}
        />

        <DriverNewEditForm isEdit={isEdit} currentDriver={currentDriver} />
      </Container>
    </Page>
  );
}
