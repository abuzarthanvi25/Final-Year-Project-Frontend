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
