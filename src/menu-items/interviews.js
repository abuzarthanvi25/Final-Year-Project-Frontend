import AddBoxIcon from '@mui/icons-material/AddBox';
import EqualizerIcon from '@mui/icons-material/Equalizer';

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const pages = {
  id: 'interviews',
  title: 'Interviews',
  type: 'group',
  children: [
    {
      id: 'util-typography',
      title: 'Take an interview',
      type: 'item',
      url: '/take-an-interview',
      icon: AddBoxIcon,
      breadcrumbs: false
    },
    {
      id: 'util-color',
      title: 'Past Evaluations',
      type: 'item',
      url: '/past-evaluations',
      icon: EqualizerIcon,
      breadcrumbs: false
    }
  ]
};

export default pages;
