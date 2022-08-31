import { ReactNode } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

interface QrWrapperProps {
  children: ReactNode;
}

export default function QrWrapper({ children }: QrWrapperProps) {
  return (
    <Container>
      <Box sx={{ p: 1, width: { sm: '780px', xs: 'calc(100% - 20px)' }, mx: 'auto' }}>
        {children}
      </Box>
    </Container>
  );
}