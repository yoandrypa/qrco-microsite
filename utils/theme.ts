import { Theme } from "@mui/material/styles";
import { THEMES_VARIANTS, PRIMARY_LIGHT_COLOR, PRIMARY_DARK_COLOR, HEADER_HEIGHT } from "../consts";

interface IBaseProps {
  ownerState: any;
  theme: Theme;
}

export const themeConfig = (mode = THEMES_VARIANTS.light) => {
  const primaryColor = mode === THEMES_VARIANTS.light ? PRIMARY_LIGHT_COLOR : PRIMARY_DARK_COLOR;

  return {
    palette: {
      mode,
      primary: {
        main: primaryColor
      }
    },
    components: {
      MuiToolbar: {
        styleOverrides: {
          root: {
            minHeight: `${HEADER_HEIGHT}px !important`
          }
        }
      },

      MuiFormLabel: {
        styleOverrides: {
          root: ({ theme }: IBaseProps) => {
            return {
              paddingLeft: theme.spacing(1),
              paddingRight: theme.spacing(1),
              marginLeft: theme.spacing(-0.5),
              borderRadius: theme.spacing(1),
              backgroundColor: theme.palette.background.default,
              '&.Mui-focused': {
                borderColor: theme.palette.primary.main,
                borderWidth: 1,
                borderStyle: 'solid',
              }
            }
          }
        }
      },

    }
  };
};
