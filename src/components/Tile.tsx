import Feels from './Icons/Feels'
import Humidity from './Icons/Humidity'
import Pop from './Icons/Pop'
import Pressure from './Icons/Presure'
import Visibility from './Icons/Visibility'
import Wind from './Icons/Wind'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';



type Props = {
  icon: 'wind' | 'feels' | 'humidity' | 'visibility' | 'pressure' | 'pop'
  title: string
  info: string | JSX.Element
  description?: string | JSX.Element
}

const icons = {
  wind: Wind,
  feels: Feels,
  humidity: Humidity,
  visibility: Visibility,
  pressure: Pressure,
  pop: Pop,
}

const Tile = ({ icon, title, info, description }: Props): JSX.Element => {
  const Icon = icons[icon]

  return (

    <Box
      sx={{
        width: '100%',
        height: '180px',
        color: '#606060',
        bgcolor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 3,
        boxShadow: 4,
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backdropFilter: 'blur(5px)',
        boxSizing: 'border-box'
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="center" fontSize="sm" fontWeight="bold">
        <Icon />
        <Typography variant="h5" ml={1}>
          {title}
        </Typography>
      </Box>
      <Typography variant="h4" mt={1} fontSize="lg">
        {info}
      </Typography>
      <Typography variant="body2" fontSize="xs" fontWeight="bold">
        {description}
      </Typography>
     </Box>
  )
}
export default Tile