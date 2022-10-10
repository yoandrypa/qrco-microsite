// @ts-nocheck

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import SectionSelector from '../helperComponents/SectionSelector';

interface LogosProps {
  image: string | null;
  handleMainData: Function;
}

const Logos = ({ image, handleMainData }: LogosProps) => (
  <Box sx={{ width: '100%', overflow: 'auto' }}>
    <Stack direction="row" spacing={2}>
      <SectionSelector
        label="No logo"
        icon={null}
        selected={!image}
        handleSelect={handleMainData} />
      <SectionSelector
        icon="/scan/scan.svg"
        label="Scan"
        selected={image === '/scan/scan.svg'}
        handleSelect={handleMainData} />
      <SectionSelector
        icon="/scan/scan1.svg"
        label="Scan me"
        selected={image === '/scan/scan1.svg'}
        handleSelect={handleMainData} />
      <SectionSelector
        icon="/scan/scan2.svg"
        label="Scan me"
        selected={image === '/scan/scan2.svg'}
        handleSelect={handleMainData} />
      <SectionSelector
        isUpload
        icon={image}
        label="Upload"
        selected={Boolean(image) && !image.startsWith('/scan/scan')}
        handleSelect={handleMainData} />
    </Stack>
  </Box>
);

export default Logos;
