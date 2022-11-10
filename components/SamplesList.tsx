import MainMicrosite from "./qr/microsites/MainMicrosite";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ForwardIcon from "@mui/icons-material/Forward";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Tooltip from "@mui/material/Tooltip";

import pluralize from "pluralize";
import {DEFAULT_COLORS} from "./qr/constants";
import {useEffect, useState} from "react";

const SamplesList = ({newData}: any) => {
  const [baseUrl, setBaseUrl] = useState<string>('');

  useEffect(() => {
    if (window) {
      setBaseUrl(window.location.href);
    }
  }, []);

  return (
    <MainMicrosite type="sample" colors={{p: DEFAULT_COLORS.p, s: DEFAULT_COLORS.s}}>
      <Box sx={{p: 3, width: '100%'}}>
        <Typography variant="h6">{'Example Microsites'}</Typography>
        <Typography sx={{
          mb: 2,
          color: theme => theme.palette.text.disabled
        }}>{`${pluralize('microsite', newData.length, true)} found`}</Typography>
        {newData.map((x: string) => (
          <ButtonGroup key={`group${x}`} sx={{width: '100%', mb: '5px'}}>
            <Button
              key={`goto${x}`}
              sx={{width: '100%'}}
              component="a"
              href={`/sample/${x}`}
              endIcon={<ForwardIcon/>}
              variant="outlined"
              color="primary"
            >
              {`Click to go to ${x}`}
            </Button>
            {baseUrl !== '' ? <Tooltip title="Copy sample URL to clipboard">
                <Button sx={{width: '40px'}} variant="outlined" color="primary" onClick={() => {
                  try {
                    navigator.clipboard.writeText(`${baseUrl}/${x}`);
                  } catch {
                    console.log('Copy failed');
                  }
                }}>
                  <ContentCopyIcon/>
                </Button>
              </Tooltip>
              : null
            }
          </ButtonGroup>
        ))}
      </Box>
    </MainMicrosite>
  )
};

export default SamplesList;
