import * as React from 'react';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import axios from 'axios';


export default function SearchForm() {
    return (
        <Container>
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                alignSelf="center"
                spacing={1}
                useFlexGap
                sx={{ pt: 2, width: { xs: '100%', sm: 'auto' } }}
            >
                <TextField
                    id="outlined-basic"
                    hiddenLabel
                    fullWidth 
                    size="small"
                    variant="outlined"
                    aria-label="Enter your email address"
                    placeholder="Почніть вводити своє місто..."
                    inputProps={{
                        autoComplete: 'on',
                        ariaLabel: 'Enter your email address',
                    }}
                />
                <Button variant="contained" color="primary">
                    Шукати
                </Button>


            </Stack>
        </Container>
    );
}
