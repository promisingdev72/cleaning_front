import { m } from 'framer-motion';
// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Card, Container, Typography } from '@mui/material';
// components
import Image from '../../components/Image';
import { MotionViewport, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const CARDS = [
  {
    icon: '/logo/logo_single.svg',
    title: 'Program 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    icon: '/logo/logo_single.svg',
    title: 'Program 2',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    icon: '/logo/logo_single.svg',
    title: 'Program 3',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    icon: '/logo/logo_single.svg',
    title: 'Program 4',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
];

const CardStyle = styled(Card)({
  padding: '20px',
});

const shadowIcon = (color) => `drop-shadow(2px 2px 2px ${alpha(color, 0.48)})`;

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(15),
  },
}));

// ----------------------------------------------------------------------

export default function HomeMinimal() {
  const theme = useTheme();

  const isLight = theme.palette.mode === 'light';

  return (
    <RootStyle>
      <Box component={MotionViewport} sx={{ padding: '50px' }}>
        <Box
          sx={{
            textAlign: 'center',
            mb: { xs: 5, md: 10 },
          }}
        >
          <m.div variants={varFade().inDown}>
            <Typography variant="h2">
              What
              <Typography component="span" variant="h1" sx={{ color: 'primary.main' }}>
                &nbsp; BusWash &nbsp;
              </Typography>
              Help you?
            </Typography>
          </m.div>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gap: { xs: 2, lg: 3 },
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(4, 1fr)' },
          }}
        >
          {CARDS.map((card, index) => (
            <m.div variants={varFade().inUp} key={card.title}>
              <CardStyle className={(index === 0 && 'cardLeft') || (index === 1 && 'cardCenter') || ''}>
                <Image
                  src={card.icon}
                  alt={card.title}
                  sx={{
                    mb: 10,
                    mx: 'auto',
                    width: 40,
                    height: 40,
                    filter: (theme) => shadowIcon(theme.palette.primary.main),
                    ...(index === 0 && {
                      filter: (theme) => shadowIcon(theme.palette.info.main),
                    }),
                    ...(index === 1 && {
                      filter: (theme) => shadowIcon(theme.palette.error.main),
                    }),
                  }}
                />
                <Typography variant="h5" paragraph>
                  {card.title}
                </Typography>
                <Typography sx={{ color: isLight ? 'text.secondary' : 'common.white' }}>{card.description}</Typography>
              </CardStyle>
            </m.div>
          ))}
        </Box>
        <Box sx={{ my: '30px' }}>
          <Typography variant="h2" sx={{ color: 'primary.main', textAlign: 'center' }}>
            About Us
          </Typography>
          <Typography variant="h4">
            Bus cleaning service sisnce 2018- Buswash is a company located in: Copenhagen Denmark. Vasbygade 18, 2450
            kobenhavn SV 7 minutes from copenhagen central station. We are a sepcial cleaning company that offers bus
            cleaning as needed. We have at our disposal a self-driving washing machine for all types of buses for a
            cheap price. We also have a toilet flushing spot, and acces to water. For long-term contracts or everyday
            washing, prices can be cheaper.
          </Typography>
        </Box>
        <Box sx={{ my: '30px' }}>
          <Typography variant="h2" sx={{ color: 'primary.main', textAlign: 'center' }}>
            Contact Us
          </Typography>
          <Typography variant="h4">
            If you are interested in hearing more about our offers, you are welcome to contact us on +455274333 or
            e-mail us: mail@gonbus.dk
          </Typography>
        </Box>
      </Box>
    </RootStyle>
  );
}