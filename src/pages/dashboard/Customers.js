// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// _mock_
import { _analyticPost, _analyticOrderTimeline, _analyticTraffic } from '../../_mock';
// components
import Page from '../../components/Page';

// ----------------------------------------------------------------------

export default function Employees() {
  const theme = useTheme();

  const { themeStretch } = useSettings();

  return (
    <Page title="Employees">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          This is Order lists
        </Typography>

        <Grid container spacing={3}>
          This is order lists
        </Grid>
      </Container>
    </Page>
  );
}
