import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Typography, Button, Stack } from '@mui/material';
import Iconify from '../../components/Iconify';
// components
import { MotionViewport, varBounce } from '../../components/animate';

const BoxStyle = styled(Box)({
  width: '1240px',
  maxWidth: '100%',
  margin: '0px auto 24px',
  textAlign: 'center',
  padding: '0px 24px',
  borderRadius: '30px',
});
const ButtonStyle = styled(Button)({
  background: 'linear-gradient(90deg, #00FBCE 0%, #0066FF 100%)',
  borderRadius: '100px',
  color: '#fff',
  fontSize: '20px',
  margin: '0 8px 16px',
  width: '234px',
  transition: 'all ease 400ms',
  '&:hover': {
    color: '#000',
    background: 'linear-gradient(90deg, #fff 100%, #fff 0%)',
  },
});

export default function Contact() {
  return (
    <MotionViewport>
      <m.div variants={varBounce().in}>
        <BoxStyle id="contact">
          <Box pt={10}>
            <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="center">
              <Typography variant="h2" className="heroText">
                Contact Us
              </Typography>
            </Stack>
            <Box mt={5}>
              <Typography variant="h3" color="primary.white">
                If you are interested in hearing more about our offers,
                <br />
                You are welcome to contact us
              </Typography>
              <Typography variant="h3" color="primary.white">
                <div>phone number: +455274333</div>
              </Typography>
              <Typography variant="h3" color="primary.white">
                <div> e-mail: mail@gonbus.dk</div>
              </Typography>
            </Box>
            <Box component="img" src="/assets/heroback.jpg" mt={4} />
          </Box>
        </BoxStyle>
      </m.div>
    </MotionViewport>
  );
}
