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
      }
    }
  }
}

export default getTheme;
