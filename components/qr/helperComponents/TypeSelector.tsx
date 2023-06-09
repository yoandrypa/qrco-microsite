import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {alpha} from '@mui/material/styles';

import RenderIcon from './RenderIcon';
import Tooltip from "@mui/material/Tooltip";
import {useState} from "react";
import Notifications from "./Notifications";
import {useTheme} from "@mui/system";
import {grey} from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";

interface TypeSelectorProps {
  handleSelect: Function;
  label: string;
  description: string;
  icon: string;
  fileName: string;
  baseUrl?: string;
}

const TypeSelector = ({baseUrl, handleSelect, label, description, icon, fileName}: TypeSelectorProps) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [over, setOver] = useState<boolean>(false);
  const theme = useTheme();

  const beforeHandle = (event: any) => {
    if (!['svg', 'BUTTON'].includes(event.target.tagName)) {
      handleSelect(fileName);
    }
  };

  const handleOver = (): void => {
    setOver((prev: boolean) => !prev);
  }

  return (
    <>
      <Box sx={{width: '100%', display: 'flex'}}>
        <Box
          sx={{
            position: 'relative',
            cursor: 'pointer',
            width: '100%',
            height: '130px',
            borderRadius: '5px',
            border: `solid 1px ${grey[500]}`,
            backgroundColor: '#fff',
            '&:hover': {
              boxShadow: '0 0 3px 2px #849abb',
            }
          }}
          onMouseEnter={handleOver}
          onMouseLeave={handleOver}
          onClick={beforeHandle}
        >
          <Tooltip title="Copy URL to clipboard">
            <IconButton
              sx={{
                position: 'absolute',
                right: '5px',
                bottom: 0,
                color: alpha(theme.palette.primary.dark, 0.25),
                '&:hover': {color: theme.palette.primary.dark}
              }}
              onClick={() => {
                try {
                  navigator.clipboard.writeText(`${baseUrl}/${fileName}`);
                  setCopied(true);
                } catch {
                  console.log('Copy failed');
                }
              }}
              id={`example${fileName}`}>
              <ContentCopyIcon/>
            </IconButton>
          </Tooltip>
          <Box sx={{display: 'flex', p: 1}}>
            <Box sx={{mt: '3px'}}>
              <RenderIcon enabled icon={icon} color={!over ? grey[800] : undefined}/>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column', textAlign: 'left', ml: 1, width: '100%'}}>
              <Box sx={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
                <Typography sx={{
                  width: '100%',
                  fontWeight: 'bold',
                  color: over ? theme.palette.primary.dark : grey[800]
                }} variant="h6">
                  {label}
                </Typography>
              </Box>
              <Typography sx={{width: '100%', color: grey[over ? 800 : 700]}}>
                {description}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      {copied && (
        <Notifications
          autoHideDuration={2500}
          message="Copied!"
          vertical="bottom"
          horizontal="center"
          severity="success"
          onClose={() => setCopied(false)}/>
      )}
    </>
  );
};

export default TypeSelector;
