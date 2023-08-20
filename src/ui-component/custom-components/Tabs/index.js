import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PropTypes from 'prop-types';

export default function Main({ value, handleChange }) {
  return (
    <Tabs sx={{ m: 0, p: 0 }} centered orientation="vertical" value={value} onChange={handleChange} aria-label="icon label tabs example">
      <Tab sx={{ m: 0, p: 0 }} icon={<PhoneIcon />} label="Chat Interview" />
      <Tab sx={{ m: 0, p: 0 }} icon={<FavoriteIcon />} label="Simulated Interview" />
    </Tabs>
  );
}

Main.propTypes = {
  value: PropTypes.number,
  handleChange: PropTypes.func
};
