import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {alpha} from '@mui/material/styles';

import RenderIcon from './RenderIcon';
import Tooltip from "@mui/material/Tooltip";
import {useState} from "react";
import Notifications from "./Notifications";

interface TypeSelectorProps {
  handleSelect: Function;
  label: string;
  icon: string;
  baseUrl?: string;
}

const TypeSelector = ({baseUrl, handleSelect, label, icon}: TypeSelectorProps) => {
  const [copied, setCopied] = useState<boolean>(false);

  const beforeHandle = () => {
    handleSelect(label);
  };

  return (
    <>
    <Box sx={{width: '100%', display: 'flex'}}>
      <Box
        sx={{
          cursor: 'pointer',
          width: '100%',
          height: '95px',
          borderRadius: '5px 0 0 5px',
          border: theme => `solid 1px ${theme.palette.text.disabled}`,
          backgroundColor: theme => alpha(theme.palette.info.light, 0.05),
          '&:hover': {
            backgroundColor: theme => alpha(theme.palette.info.light, 0.3)
          }
        }}
        onClick={beforeHandle}
      >
        <Box sx={{display: 'flex', p: 1}}>
          <Box sx={{mt: '3px'}}>
            <RenderIcon icon={icon} enabled/>
          </Box>
          <Box sx={{display: 'flex', flexDirection: 'column', textAlign: 'left', ml: 1, width: '100%'}}>
            <Box sx={{display: 'flex', width: '100%', flexDirection: 'column'}}>
              <Typography sx={{width: '100%', fontWeight: 'bold', color: theme => theme.palette.text.disabled}}
                          variant="h6">
                {label.toUpperCase()}
              </Typography>
              <Typography sx={{width: '100%', color: theme => theme.palette.text.disabled}}>
                {'Click here to see the example'}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Tooltip title="Copy sample URL to clipboard">
        <Box
          onClick={() => {
            try {
              navigator.clipboard.writeText(`${baseUrl}/${label}`);
              setCopied(true);
            } catch {
              console.log('Copy failed');
            }
          }}
          sx={{
          cursor: 'pointer',
          width: '50px',
          height: '95px',
          borderRadius: '0 5px 5px 0',
          border: theme => `solid 1px ${theme.palette.text.disabled}`,
          backgroundColor: theme => theme.palette.primary.dark,
          '&:hover': {
            backgroundColor: theme => theme.palette.primary.light
          }
        }}>
          <ContentCopyIcon sx={{color: '#fff', ml: '9px', mt: '11px'}}/>
        </Box>
      </Tooltip>
    </Box>
      {copied && (
        <Notifications
          autoHideDuration={2500}
          message="Copied!"
          vertical="bottom"
          horizontal="center"
          severity="success"
          onClose={() => setCopied(false)} />
      )}
      </>
  );
};

export default TypeSelector;
