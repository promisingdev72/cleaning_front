import { m } from 'framer-motion';
// @mui
import { Box, Container, Typography } from '@mui/material';
// components
import { MotionViewport, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function HomeAdvertisement() {
  return (
    <Container component={MotionViewport}>
      <Box
        sx={{
          pl: { md: 10 },
          textAlign: { xs: 'center', md: 'center' },
        }}
      >
        <Box component={m.div} variants={varFade().inDown} sx={{ color: 'common.white', my: 5 }}>
          <Typography variant="h2">Get started with Bus Wash today</Typography>
        </Box>
      </Box>
    </Container>
  );
}
