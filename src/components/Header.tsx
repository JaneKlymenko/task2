import React, { FC } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/auth-context';
import { Link } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

import Typography from '@mui/material/Typography';

interface HeaderProps {
  title: string;
}

const Header: FC<HeaderProps> = (props) => {
  const { title } = props;
  const { currentUser, signOut } = useContext(AuthContext)
  const isLoggedIn = !!currentUser;


  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="left"
          noWrap
          sx={{ flex: 1 }}
        >
          <Link to="/">{title}</Link>
        </Typography>


      {isLoggedIn ? (
        <>
          <Button
            color="primary"
            variant="contained"
            size="small"
            component="a"
            href="/profile/"
            target="_self"
          >
            Профіль
          </Button>
          <Button
            color="primary"
            variant="text"
            size="small"
            component="a"
            href="/sign-in/"
            target="_self"
            onClick={signOut}
          >
            Вийти
        </Button>
      </>
      ) : (
        <>
          <Button
          color="primary"
          variant="text"
          size="small"
          component="a"
          href="/sign-in/"
          target="_self"
        >
          Увійти
        </Button>
        <Button
          color="primary"
          variant="contained"
          size="small"
          component="a"
          href="/sign-up/"
          target="_self"
        >
          Зареєструватися
        </Button>
      </>

      )}
 

      </Toolbar>
    </React.Fragment>
  );
};

export default Header;
