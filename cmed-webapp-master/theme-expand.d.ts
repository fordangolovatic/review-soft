import { SimplePaletteColorOptions } from '@mui/material';
import { BreakpointOverrides } from '@mui/system';
import { CSSProperties } from 'react';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    appDrawer: {
      width: CSSProperties['width'];
      breakpoint: BreakpointOverrides;
    };
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    appDrawer?: {
      width?: CSSProperties['width'];
      breakpoint?: BreakpointOverrides;
    };
  }
}
declare module '@mui/material/styles' {
  interface Palette {
    darkGreen?: string;
  }
  interface CustomPaletteColorOptions extends SimplePaletteColorOptions {
    white?: string;
  }
  interface PaletteOptions {
    darkGreen?: CustomPaletteColorOptions;
  }
}
declare module '@mui/material' {
  interface ButtonPropsColorOverrides {
    darkGreen: true;
  }
  interface ChipPropsColorOverrides {
    darkGreen: true;
  }

  interface SvgIconPropsColorOverrides {
    darkGreen: true;
  }
  interface IconPropsColorOverrides {
    darkGreen: true;
  }

  interface CheckboxPropsColorOverrides {
    darkGreen: true;
  }
}
