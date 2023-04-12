import { Theme } from '@mui/system'

export function parseFormFieldSx(sx: any, theme: Theme) {
  return {
    '& .MuiFormLabel-root.Mui-focused': {
      px: 1,
      ml: -0.5,
      fontWeight: 'bold',
      borderRadius: 1,
      bgcolor: 'background.paper',
      borderColor: 'primary.main',
      borderWidth: 1,
      borderStyle: 'solid',
    },
    ...sx
  }
}

export function parseFormFieldInputSx(sx: any, theme: Theme) {
  return { bgcolor: 'background.paper', color: 'primary.main' }
}