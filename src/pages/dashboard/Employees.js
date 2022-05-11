// @mui
import { Grid, Container, Typography } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';

// ----------------------------------------------------------------------

export default function Employees() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Employees">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          This is Employee lists
        </Typography>

        <Grid container spacing={3}>
          This is Employee lists
        </Grid>
      </Container>
    </Page>
  );
}
