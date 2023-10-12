import '../App.css';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { Suspense } from 'react';
import Router from '../@router';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4158D0',
    },
    secondary: {
      main: '#C850C0FF',
    },
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <div className="App">
      <Suspense fallback={null}>
        <Router />
      </Suspense>
    </div>
  </ThemeProvider>
);

export default App;
