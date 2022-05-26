// @mui
import { styled } from '@mui/material/styles';
// components
import Page from '../components/Page';
// sections
import { HomeHero, HomeAdvertisement } from '../sections/home';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <Page title="Buswash Aps">
      <HomeHero />
      <ContentStyle>
        <HomeAdvertisement />
      </ContentStyle>
    </Page>
  );
}
