// @mui
import { Container } from '@mui/material';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import SmsList from './SmsList';

// ----------------------------------------------------------------------

export default function Sms() {
  const { themeStretch } = useSettings();

  return (
    <Page title="SMS">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <SmsList />
      </Container>
    </Page>
  );
}
