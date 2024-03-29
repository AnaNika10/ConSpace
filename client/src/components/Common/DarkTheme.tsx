import { ThemeOptions, createTheme } from '@mui/material/styles';

export const themeOptions: ThemeOptions = createTheme({
    palette: {
        mode: 'dark',
        primary: {
        main: '#9c27b0',
        },
        secondary: {
        main: '#1976d2',
        },
        error: { 
        main: '#f44336',
        },
        info: {
        main: '#c0ca33',
        },
        background: {
        default: '#1c1e25',
        },
    },
});
  