import { Breakpoints, createTheme, Theme } from '@mui/material';

type CustomTheme = {
  theme: Theme;
  breakpoints: Breakpoints;
};

const useCustomTheme = (): CustomTheme => {
  const defaultTheme = createTheme({
    palette: {
      primary: {
        main: '#DA2C38',
        light: '#F34652',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#00A04A',
        dark: '#00534C',
        contrastText: '#ffffff',
      },
      darkGreen: {
        main: '#00534C',
        contrastText: '#ffffff',
      },
    },
    breakpoints: {
      values: {
        xl: 1920,
        lg: 1280,
        md: 1000,
        sm: 769,
        xs: 0,
      },
    },
    shape: {
      borderRadius: 5,
    },
  });
  const { typography, breakpoints, components } = defaultTheme;
  const theme: Theme = {
    ...defaultTheme,
    components: {
      ...components,
      MuiCssBaseline: {
        styleOverrides: {
          fontFamily: '"Euclid Circular A", sans-serif',
        },
      },
    },
    typography: {
      ...typography,
      h1: {
        [breakpoints.up('xs')]: {
          fontSize: '32px',
          fontWeight: '300',
          lineHeight: '41px',
        },
        [breakpoints.up('md')]: {
          fontSize: '44px',
          fontWeight: '300',
          lineHeight: '39px',
        },
        [breakpoints.up('xl')]: {
          fontSize: '64px',
          fontWeight: '300',
          lineHeight: '81px',
        },
      },
      h2: {
        [breakpoints.up('xs')]: {
          fontSize: '36px',
          fontWeight: '300',
          lineHeight: '46px',
        },
        [breakpoints.up('md')]: {
          fontSize: '36px',
          fontWeight: '300',
          lineHeight: '46px',
        },
        [breakpoints.up('xl')]: {
          fontSize: '52px',
          fontWeight: '300',
          lineHeight: '66px',
        },
      },
      h3: {
        [breakpoints.up('xs')]: {
          fontSize: '28px',
          fontWeight: '400',
          lineHeight: '36px',
        },
        [breakpoints.up('md')]: {
          fontSize: '32px',
          fontWeight: '400',
          lineHeight: '41px',
        },
        [breakpoints.up('xl')]: {
          fontSize: '48px',
          fontWeight: '400',
          lineHeight: '61px',
        },
      },
      h4: {
        [breakpoints.up('xs')]: {
          fontSize: '24px',
          fontWeight: '400',
          lineHeight: '30px',
        },
        [breakpoints.up('md')]: {
          fontSize: '28px',
          fontWeight: '400',
          lineHeight: '36px',
        },
        [breakpoints.up('xl')]: {
          fontSize: '40px',
          fontWeight: '400',
          lineHeight: '51px',
        },
      },
      h5: {
        [breakpoints.up('xs')]: {
          fontSize: '16px',
          fontWeight: '600',
          lineHeight: '20px',
        },
        [breakpoints.up('md')]: {
          fontSize: '14px',
          fontWeight: '600',
          lineHeight: '18px',
        },
        [breakpoints.up('xl')]: {
          fontSize: '20px',
          fontWeight: '600',
          lineHeight: '25px',
        },
      },
      h6: {
        [breakpoints.up('xl')]: {},
      },
      body1: {
        fontFamily: '"Euclid Circular A", sans-serif',
        [breakpoints.up('xs')]: {
          fontSize: '16px',
          fontWeight: '400',
          lineHeight: '20px',
        },
        [breakpoints.up('md')]: {
          fontSize: '14px',
          fontWeight: '500',
          lineHeight: '18px',
        },
        [breakpoints.up('xl')]: {
          fontSize: '20px',
          fontWeight: '400',
          lineHeight: '25px',
        },
      },
      body2: {
        [breakpoints.up('xs')]: {},
        [breakpoints.up('md')]: {
          fontSize: '13px',
          fontWeight: '400',
          lineHeight: '13px',
        },
        [breakpoints.up('xl')]: {
          fontSize: '16px',
          fontWeight: '400',
          lineHeight: '20px',
        },
      },
      subtitle1: {
        [breakpoints.up('xs')]: {
          fontSize: '16px',
          fontWeight: '400',
          lineHeight: '20px',
        },
        [breakpoints.up('md')]: {
          fontSize: '18px',
          fontWeight: '400',
          lineHeight: '23px',
        },
        [breakpoints.up('xl')]: {
          fontSize: '26px',
          fontWeight: '400',
          lineHeight: '33px',
        },
      },
      subtitle2: {
        [breakpoints.up('xs')]: {
          fontSize: '16px',
          fontWeight: '700',
          lineHeight: '20px',
        },
        [breakpoints.up('md')]: {
          fontSize: '18px',
          fontWeight: '600',
          lineHeight: '23px',
        },
        [breakpoints.up('xl')]: {
          fontSize: '26px',
          fontWeight: '600',
          lineHeight: '33px',
        },
      },
      button: {
        fontFamily: '"Euclid Circular A", sans-serif',
        [breakpoints.up('xs')]: {
          fontSize: '16px',
          fontWeight: '700',
          lineHeight: '20px',
          textTransform: 'initial',
        },
        [breakpoints.up('md')]: {
          fontSize: '14px',
          fontWeight: '700',
          lineHeight: '18px',
          textTransform: 'initial',
        },
        [breakpoints.up('xl')]: {
          fontSize: '20px',
          fontWeight: '600',
          lineHeight: '25px',
          textTransform: 'initial',
        },
      },
      caption: {
        [breakpoints.up('xs')]: {
          fontSize: '14px',
          fontWeight: '400',
          lineHeight: '18px',
        },
        [breakpoints.up('md')]: {
          fontSize: '10px',
          fontWeight: '400',
          lineHeight: '13px',
        },
        [breakpoints.up('xl')]: {
          fontSize: '10px',
          fontWeight: '400',
          lineHeight: '13px',
        },
      },
    },
  };
  return { theme, breakpoints };
};

export default useCustomTheme;
