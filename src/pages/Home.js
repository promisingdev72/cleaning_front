// @mui
import { styled } from '@mui/material/styles';
// components
import Page from '../components/Page';
// sections
import { HomeHero, Services, About, Contact } from '../sections/home';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <Page title="BusWash App">
      <HomeHero />
      <ContentStyle>
        <About />
        <Services />
        <Contact />
      </ContentStyle>
    </Page>
  );
}
