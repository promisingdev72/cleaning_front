// @mui
import { Container, Typography } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// import CustomerList from './CustomerList';

// ----------------------------------------------------------------------

export default function Customers() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Customers">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          This is Customer lists
        </Typography>
        <Typography variant="h7" sx={{ mb: 5 }}>
          This is Customer lists
        </Typography>

        {/* <CustomerList /> */}
      </Container>
    </Page>
  );
}
