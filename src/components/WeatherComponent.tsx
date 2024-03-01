import { ChangeEvent } from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { optionType } from '../types/types'


type Props = {
  city: string
  options: []
  handleCityChange: (e: ChangeEvent<HTMLInputElement>) => void
  onOptionSelect: (option: optionType) => void
  getWeatherData: () => void
}

const WeatherComponent = ({
  city,
  options,
  onOptionSelect,
  getWeatherData,
  handleCityChange,
}: Props) => {
  return (   
    <Container>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignSelf="center"
        spacing={1}
        useFlexGap
        sx={{ pt: 2, width: { xs: '100%', sm: 'auto' }, position: 'relative'}}
      >
        <TextField
            id="outlined-basic"
            hiddenLabel
            fullWidth 
            size="small"
            variant="outlined"
            aria-label="Enter city"
            placeholder="Почніть вводити своє місто..."
            inputProps={{
                autoComplete: 'off',
                ariaLabel: 'Enter city',
            }}
            value={city}
            onChange={handleCityChange}
        />
        {options.length > 0 && (
          <List
            sx={{ 
              width: '100%', 
              maxWidth: 360, 
              bgcolor: 'white', 
              position: 'absolute', 
              top: '60px', 
              zIndex: 4,
              borderRadius: 3,
              boxShadow: 4,
              backdropFilter: 'blur(5px)'
            }}
            aria-label="contacts"
          >
            {options.map((option: optionType, index: number) =>
              (
                <ListItem
                  key={option.name + '-' + index}
                  disableGutters
                >
                  <Button
                    sx={{ 
                      width: '100%', 
                      maxWidth: 360, 
                      zIndex: 4,
                      textAlign: 'left',
                      justifyContent: 'start' 
                    }}
                    onClick={() => onOptionSelect(option)}
                  >
                    {option.name}
                  </Button>
                  
                </ListItem>
              ) 
            )}
          </List>
       )}
            
      <Button
        variant="contained"
        color="primary"
        onClick={getWeatherData}                
      >
        Шукати
      </Button>


      </Stack>
    </Container>
  );
};

export default WeatherComponent;
