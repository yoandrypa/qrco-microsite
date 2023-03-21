import Box from "@mui/material/Box";

interface Props {
  micrositeBackImage?: any;
  data?: any;
}

export default function RenderMicrositeBackgroundImage({micrositeBackImage, data}: Props) {
  return (
    <Box
      component="img"
      src={micrositeBackImage.content || micrositeBackImage}
      alt="backgroundImg"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100%',
        zIndex: -1,
        marginLeft: '50%',
        transform: 'translateX(-50%)',
        opacity: data.micrositeBackImageOpacity !== undefined ? data.micrositeBackImageOpacity : 1,
        filter: data.micrositeBackImageBlurness !== undefined ? `blur(${data.micrositeBackImageBlurness}px)` : 'unset'
      }}
    />
  );
}
