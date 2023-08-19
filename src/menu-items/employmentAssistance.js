import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Employment Assistance',
  type: 'group',
  children: [
    {
      id: 'util-typography',
      title: 'Recommended Job Listings',
      type: 'item',
      url: '/',
      icon: WorkIcon,
      breadcrumbs: false
    },
    {
      id: 'util-typography1',
      title: 'Career Guidance',
      type: 'item',
      url: '/',
      icon: SchoolIcon,
      breadcrumbs: false
    }
  ]
};

export default utilities;
