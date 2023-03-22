import Box from "@mui/material/Box";

interface Props {
  micrositeBackImage?: any;
  data?: any;
  height: string;
}

export default function RenderMicrositeBackgroundImage({micrositeBackImage, data, height}: Props) {
  return (
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
      }}
    />
  );
}
