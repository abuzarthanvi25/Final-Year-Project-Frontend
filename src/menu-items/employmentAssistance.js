import WorkIcon from '@mui/icons-material/Work';

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'employmentAssistance',
  title: 'Employment Assistance',
  type: 'group',
  children: [
    {
      id: 'job-listings',
      title: 'Job Listings',
      type: 'item',
      url: '/job-listings',
      icon: WorkIcon,
      breadcrumbs: false
    }
  ]
};

export default utilities;
