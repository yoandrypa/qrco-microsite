import Box from "@mui/material/Box";

interface Props {
  micrositeBackImage?: any;
  data?: any;
  height: string;
  width: string;
}

export default function RenderMicrositeBackgroundImage({micrositeBackImage, data, height, width}: Props) {
  return (
    <Box sx={{
      top: 0,
      left: 0,
      position: 'fixed',
      background: '#fff',
      height,
      width,
      marginLeft: '50%',
      transform: 'translateX(-50%)'
    }}>
      <Box
        component="img"
        src={micrositeBackImage.content || micrositeBackImage}
        alt="backgroundImg"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          height,
          zIndex: -10,
          marginLeft: '50%',
          transform: 'translateX(-50%)',
          opacity: data.micrositeBackImageOpacity !== undefined ? data.micrositeBackImageOpacity : 1,
          filter: data.micrositeBackImageBlurness !== undefined ? `blur(${data.micrositeBackImageBlurness}px)` : 'unset'
        }} />
      </Box>
  );
}
