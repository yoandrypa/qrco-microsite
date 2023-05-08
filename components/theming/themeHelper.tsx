import { Theme } from "@mui/material/styles";

interface IBaseProps {
  ownerState: any;
  theme: Theme;
}

const getTheme = (primary: string, secondary: string, isFramed?: boolean) => {
  return {
    palette: {
      primary: {
        main: primary
      },
      secondary: {
        main: secondary
      }
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
              width: !isFramed ? '10px' : '5px',
            },
            "&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track": {
              background: secondary,
            },
            "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
              background: primary,
            }
          }
        }
      },

      MuiFormLabel: {
        styleOverrides: {
          root: ({ theme }: IBaseProps) => {
            return {
              color: 'inherit',
              '&.Mui-focused': { color: 'inherit' },
              '&.Mui-error': { color: theme.palette.error.main },
              '&.Mui-disabled': { color: 'inherit' },
            }
          }
        }
      },

      MuiFormControl: {
        styleOverrides: {
          root: ({ theme }: IBaseProps) => {
            return {
              '& .MuiInputBase-root': { color: 'inherit' },
              '& .Mui-disabled': {
                '-webkit-text-fill-color': 'inherit !important',
                cursor: 'not-allowed',
                opacity: 0.7,
              },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'inherit !important' },
            }
          }
        }
      },
    }
  }
}

export default getTheme;
