import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import PastEvaluations from 'views/past-evaluations';
import JobListings from 'views/job-listings';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const TakeAnInterview = Loadable(lazy(() => import('views/take-an-interview')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'take-an-interview',
      element: <TakeAnInterview />
    },
    {
      path: 'past-evaluations',
      element: <PastEvaluations />
    },
    {
      path: 'job-listings',
      element: <JobListings />
    }
  ]
};

export default MainRoutes;
