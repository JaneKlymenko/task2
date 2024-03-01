// Footer.tsx
import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" mt={1}>
      {'Copyright © '}
      <Link href="https://www.linkedin.com/in/yanaklymenko/">Yana Klymenko&nbsp;</Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

const Footer: React.FC = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 10 },
        textAlign: { sm: 'center', md: 'left' },
      }}
    >
      <div>
        <Copyright />
      </div>
    </Container>
  );
};

export default Footer;