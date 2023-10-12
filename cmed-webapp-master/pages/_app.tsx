import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { appWithTranslation } from 'next-i18next';
import { ToastContainer } from 'react-toastify';
import queryConfig from '../api/config/query';
import Auth from '../components/Auth';
import { GlobalHead } from '../components/Head/Head';
import { useCheckAccessExpiry } from '../utilities/hooks/useCheckAccessExpiry';
import useCustomTheme from '../utilities/hooks/useTheme';
import type { AppProps } from 'next/app';
import 'react-toastify/dist/ReactToastify.css';
import '../utilities/outdated__styles/globals.css';
const App = ({ Component, pageProps }: AppProps) => {
  const { theme } = useCustomTheme();
  // const desktop = useMediaQuery(theme.breakpoints.up('sm'));
  useCheckAccessExpiry();

  return (
    <QueryClientProvider client={queryConfig}>
      <GlobalHead />
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Auth />
          {/*<Hydrate state={pageProps.dehydratedState}>*/}
          <Component {...pageProps} />
          <ToastContainer
            position="bottom-left"
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <ReactQueryDevtools initialIsOpen={false} />
          {/*</Hydrate>*/}
        </CssBaseline>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default appWithTranslation(App);
