import { MouseEvent, useCallback, useContext, useMemo } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MUIButton from "@mui/material/Button";
import CheckBoxEmpty from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import CheckBoxChecked from "@mui/icons-material/CheckBoxTwoTone";
import useMediaQuery from "@mui/material/useMediaQuery";

import TypeSelector from "./TypeSelector";
import Context from "../../context/Context";
import { styled } from "@mui/material/styles";

interface RenderTypeSelectorProps {
  selected: string;
  handleSelect: Function;
}

const Button = styled(MUIButton)(() => ({ width: "calc(50% - 5px)", height: "32px" }));
const getColor = (condition: boolean): string => (condition ? "green" : "default");

const RenderTypeSelector = ({ selected, handleSelect }: RenderTypeSelectorProps) => {
  // @ts-ignore
  const { data, setData } = useContext(Context);
  const isWide = useMediaQuery("(min-width:600px)", { noSsr: true });

  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    // @ts-ignore
    const isDynamic = event.currentTarget.id === "dynamic";
    if (isDynamic) {
      setData({ ...data, isDynamic });
    } else if (data.isDynamic !== undefined) {
      const tempoData = { ...data };
      delete tempoData.isDynamic;
      setData(tempoData);
    }
  };

  const isDynamic = useMemo(() => Boolean(data.isDynamic), [data.isDynamic]);

  const renderTypeSelector = (item: string, label: string, description: string, enabled: boolean) => (
    <Grid item sm={3} xs={12}>
      <TypeSelector
        icon={item}
        label={label}
        enabled={enabled}
        description={description}
        selected={selected === item}
        handleSelect={handleSelect} />
    </Grid>
  );

  const renderNo = useCallback(() => (<CheckBoxEmpty color="error" />), []);
  const renderYes = useCallback(() => (<CheckBoxChecked color="success" />), []);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            sx={{ borderColor: getColor(!isDynamic), color: getColor(!isDynamic) }}
            onClick={handleClick}
            startIcon={!isDynamic ? renderYes() : renderNo()}
            key="static"
            id="static"
            variant="outlined">{isWide ? "Static QR Codes" : "Static"}</Button>
          <Button
            sx={{ borderColor: getColor(isDynamic), color: getColor(isDynamic) }}
            onClick={handleClick}
            startIcon={isDynamic ? renderYes() : renderNo()}
            key="dynamic"
            id="dynamic"
            variant="outlined">{isWide ? "Dynamic QR Codes" : "Dynamic"}</Button>
        </Box>
      </Grid>
      {renderTypeSelector("web", "Website", "LinkModel to any page on the web", !isDynamic)}
      {!isDynamic ?
        (<>
          {renderTypeSelector("email", "Email", "Receive email messages", false)}
          {renderTypeSelector("sms", "SMS", "Receive text messages", false)}
          {renderTypeSelector("vcard", "VCard", "Share your contact details", false)}
          {renderTypeSelector("text", "Text", "Display a short text message", false)}
          {renderTypeSelector("wifi", "WiFi", "Get connected to a WiFi network", false)}
        </>) :
        renderTypeSelector("vcard+", "VCard Plus", "Share your contact and social details", true)
      }
      {renderTypeSelector("twitter", "Twitter", "Post a tweet", !isDynamic)}
      {renderTypeSelector("whatsapp", "Whatsapp", "Send a Whatsapp message", !isDynamic)}
      {renderTypeSelector("facebook", "Facebook", "Share an URL in your wall", !isDynamic)}
      {isDynamic ? (
        <>
          {renderTypeSelector("pdf", "PDF file", "Share a PDF file", true)}
          {renderTypeSelector("audio", "Audio file", "Share an audio file", true)}
          {renderTypeSelector("image", "Image file", "Share an image file", true)}
          {renderTypeSelector("video", "Video file", "Share a video file", true)}
        </>
      ) : null
      }
      {/*{renderTypeSelector('pdf', 'PDF file', 'Share a PDF file', false)}
      {renderTypeSelector('audio', 'Audio file', 'Share an audio file', false)}
      {renderTypeSelector('image', 'Image file', 'Share an image file', isDynamic)}
      {renderTypeSelector('video', 'Video file', 'Share a video file', false)}*/}
    </Grid>
  );
};

export default RenderTypeSelector;
