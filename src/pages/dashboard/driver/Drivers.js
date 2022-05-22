// @mui
import { Container } from '@mui/material';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import DriverList from './DriverList';

// ----------------------------------------------------------------------

export default function Drivers() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Drivers">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <DriverList />
      </Container>
    </Page>
  );
}
