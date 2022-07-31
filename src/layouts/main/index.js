import { Outlet } from 'react-router-dom';
// @mui
import { Box, Link, Container, Typography, Stack } from '@mui/material';
// components
import Logo from '../../components/Logo';
//
import MainHeader from './MainHeader';
import Footer from './Footer';

// ----------------------------------------------------------------------

export default function MainLayout() {
  return (
    <Stack sx={{ minHeight: 1 }}>
      <MainHeader />

      <Outlet />

      <Box sx={{ flexGrow: 1 }} />
      <Box
        sx={{
          py: 5,
          textAlign: 'center',
          position: 'relative',
          bgcolor: 'background.default',
        }}
      >
        <Footer />
      </Box>
    </Stack>
  );
}
