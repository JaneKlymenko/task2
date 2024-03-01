import { useContext } from 'react';
import { AuthContext } from '../context/auth-context';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ChangeEvent, FormEvent, useState } from 'react'
import { signInUser } from '../firebase/firebase'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
const defaultTheme = createTheme();


export default function Home() {
  const { currentUser, signOut } = useContext(AuthContext)
  const isLoggedIn = !!currentUser;


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        <Typography variant="h3" fontWeight="bold" color="inherit" sx={{ flexGrow: 1 }}>
            Твоя погода - погода в твоєму місті
          </Typography>

          {isLoggedIn ? (
          <>
          <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: { xs: 2, sm: 4 } }}
              >
                Щоб продивитися прогноз погоди в обраних містах, перейди в 
                <Link
                        href="/profile"
                        color="primary"
                        variant="body2"
                        fontWeight="bold"
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          '& > svg': { transition: '0.2s' },
                          '&:hover > svg': { transform: 'translateX(2px)' },
                        }}
                      >
                        <span>  профіль</span>
                        <ChevronRightRoundedIcon
                          fontSize="small"
                          sx={{ mt: '1px', ml: '2px' }}
                        />
                      </Link>
              </Typography>

          </>
          ) : (
            <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: { xs: 2, sm: 4 } }}
              >
                Якщо хочеш отримати розширений функціонал, 
                який включає збереження обраних міст і розширений прогноз 
                <Link
                        href="/sign-in"
                        color="primary"
                        variant="body2"
                        fontWeight="bold"
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          '& > svg': { transition: '0.2s' },
                          '&:hover > svg': { transform: 'translateX(2px)' },
                        }}
                        // onClick={(event) => {
                        //   event.stopPropagation();
                        // }}
                      >
                        <span> зайди в акаунт</span>
                        <ChevronRightRoundedIcon
                          fontSize="small"
                          sx={{ mt: '1px', ml: '2px' }}
                        />
                      </Link>
              </Typography>
        )}
            </Box>
        {/* <Box
          sx={{
            marginTop: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            <WeatherComponent 
              city={city} 
              options={options} 
              handleCityChange={handleCityChange}
              onOptionSelect={onOptionSelect} 
              getWeatherData={getWeatherData}
            />
        </Box> */}
      </Container>
    </ThemeProvider>
  );
}