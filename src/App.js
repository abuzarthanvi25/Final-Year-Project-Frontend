import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';

import { initializeApp } from 'firebase/app';
import { firebaseConfig } from 'utils/authentication/firebase';
import { useAuth } from 'utils/authentication/authProvider';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { useState } from 'react';

initializeApp(firebaseConfig);

// ==============================|| APP ||============================== //

const App = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const customization = useSelector((state) => state.customization);

  useEffect(() => {
    if (!currentUser) {
      navigate('/pages/login');
    }
  }, [currentUser]);

  const [tabChanges, setTabChanges] = useState(0);

  useEffect(() => {
    // Listen for visibility change events
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page is hidden (tab is not active)
        setTabChanges((prevTabChanges) => prevTabChanges + 1);
        if (tabChanges > 1) {
          console.log('A');
        }
        alert("Please don't switch tabs while the interview is in progress");
      } else {
        // Page is visible (tab is active)
        setTabChanges(0); // Reset the tab changes counter
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [tabChanges]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          <Routes />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
