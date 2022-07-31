import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Typography, Stack } from '@mui/material';
// components
import { MotionContainer, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const Img = styled('img')({
  maxWidth: '100%',
  height: 'auto',
});
const BoxStyle = styled(Box)({
  maxWidth: '1288px',
  margin: '20px auto',
  position: 'relative',
  paddingLeft: '24px',
  paddingRight: '24px',
});

// ----------------------------------------------------------------------
export default function About() {
  return (
    <Box sx={{ lineHeight: '0', textAlign: 'center' }} id="home">
      <BoxStyle>
        <MotionContainer>
          <Stack
            direction={{ xs: 'column', sm: 'column', md: 'row' }}
            justifyContent="space-between"
            sx={{ textAlign: 'left', paddingTop: '90px' }}
            id="about"
          >
            <Box sx={{ maxWidth: '584px', mb: 4 }}>
              <m.div variants={varFade().inRight}>
                <Typography
                  variant="h2"
                  className="heroText"
                  sx={{
                    px: '8px',
                  }}
                >
                  About Us
                </Typography>
              </m.div>
              <m.div variants={varFade().inRight}>
                <Typography
                  variant="h4"
                  sx={{
                    px: '8px',
                  }}
                >
                  Bus cleaning service sisnce 2018- Buswash is a company located in <br />
                  Copenhagen Denmark. Vasbygade 18, 2450 kobenhavn SV 7 minutes from copenhagen central station.
                  <br /> We are a sepcial cleaning company that offers bus cleaning as needed.
                  <br /> We have at our disposal a self-driving washing machine for all types of buses for a cheap
                  price. We also have a toilet flushing spot, and acces to water. <br /> For long-term contracts or
                  everyday washing, prices can be cheaper.
                </Typography>
              </m.div>
            </Box>
            <m.div variants={varFade().inDown}>
              <Img src="/assets/about.jpg" width="800px" sx={{ mx: { xs: 'auto', sm: 'auto', md: 4 } }} />
            </m.div>
          </Stack>
        </MotionContainer>
      </BoxStyle>
    </Box>
  );
}
