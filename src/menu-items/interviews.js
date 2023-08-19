import AddBoxIcon from '@mui/icons-material/AddBox';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const pages = {
  id: 'utilities',
  title: 'Interviews',
  type: 'group',
  children: [
    {
      id: 'util-typography',
      title: 'Take an interview',
      type: 'item',
      url: '/',
      icon: AddBoxIcon,
      breadcrumbs: false
    },
    {
      id: 'util-color',
      title: 'Past Evaluations',
      type: 'item',
      url: '/',
      icon: EqualizerIcon,
      breadcrumbs: false
    },
    {
      id: 'util-shadow',
      title: 'Overall Aptitude Status',
      type: 'item',
      url: '/',
      icon: CheckCircleIcon,
      breadcrumbs: false
    }
  ]
};

export default pages;
