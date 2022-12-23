const getTheme = (primary: string, secondary: string) => {
  return {
    palette: {
      primary: {
        main: primary
      },
      secondary: {
        main: secondary
      }
    }
  }
}

export default getTheme;
