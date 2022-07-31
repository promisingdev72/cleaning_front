import { Stack, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { IconButtonAnimate } from '../../components/animate';
import Logo from '../../components/Logo';

const FooterStyle = styled('footer')(() => ({
  padding: '80px 48px',
  marginTop: '60px',
  color: '#838990',
}));
const LinkStyle = styled(Link)({
  fontWeight: 'lighter',
  '&:hover': {
    color: '#B158E2',
  },
  color: 'white',
  fontSize: '16px',
  transition: 'all ease 400ms',
});

export default function Footer() {
  const Socials = [
    {
      img: '/assets/telegram.png',
      url: 'https://t.me/#',
    },
    {
      img: '/assets/linkedin.png',
      url: 'https://www.linkedin.com/# ',
    },
    {
      img: '/assets/instagram.png',
      url: 'https://www.instagram.com/#',
    },
    {
      img: '/assets/twitter.png',
      url: 'https://twitter.com/#',
    },
  ];
  return (
    <FooterStyle>
      <Stack
        direction={{ xs: 'column', lg: 'row' }}
        justifyContent="space-between"
        alignItems="center"
        sx={{ px: { xs: '24px', lg: '48px' }, mb: '24px' }}
      >
        <Logo type={'full'} />
        <Stack direction="row" sx={{ mt: { xs: '24px', lg: '0' } }}>
          {Socials.map((e, index) => (
            <div key={index}>
              <IconButtonAnimate>
                <LinkStyle href={e.url} target="_blank">
                  <Box component="img" src={e.img} />
                </LinkStyle>
              </IconButtonAnimate>
            </div>
          ))}
        </Stack>
      </Stack>
      <Stack mx={3}>
        <Box textAlign="center">
          <Typography variant="body2">© BushWash 2022, All Rights Reserved</Typography>
        </Box>
      </Stack>
    </FooterStyle>
  );
}
