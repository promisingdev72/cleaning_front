// @mui
import { Container, Card, Box } from '@mui/material';
// hooks
import useSettings from '../../../hooks/useSettings';
import useAuth from '../../../hooks/useAuth';
// route
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';

// ----------------------------------------------------------------------

export default function SmsList() {
  const { themeStretch } = useSettings();
  const { user } = useAuth();

  return (
    <Page title="Smslist">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="SMS List"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'SmsList' }]}
        />
        <Card>
          <Box>
            <div>Here is sms list</div>
          </Box>
        </Card>
      </Container>
    </Page>
  );
}
