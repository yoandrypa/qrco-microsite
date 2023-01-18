import { Info, Link } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
import { handleFont } from '../renderers/helper';
import RenderField from './RenderField';

interface RenderKeyValueProps {
    newData: any,
    item: string,
    type: 'link' | 'default'
}

export default function RenderKeyValueFields ({
    newData,item,type}: RenderKeyValueProps) {
    if (!newData[item]) return <></>;
    if (newData[item].items.length === 0 && newData[item].heading === '')
      return <></>;
  
    return (
      <>
        <Grid item xs={1} key={`${item}Icon`}>
          {type === 'link' ? (
            <Link sx={{ color: theme => theme.palette.primary.main }} />
          ) : (
            <Info sx={{ color: theme => theme.palette.primary.main }} />
          )}
        </Grid>
        <Grid item xs={11} key={`${item}Body`}>
          <Typography sx={{ fontWeight: 'bold', ...handleFont(newData, 't') }}>
            {newData[item].heading}
          </Typography>
          <Grid container spacing={0}>
            {newData[item].items.map((item: any, index: Number) => {
              if (item.value === '') return <></>;
              const value = type === 'link' ? `${item.label}` : item.value;
              const label = type === 'link' ? undefined : item.label;
              const link = type === 'link' ? item.value : undefined;
              const icon = type === 'link' ? 'link' : undefined;
              return (
                <RenderField
                  key={`${item}${index}`}
                  value={value}
                  icon={icon}
                  label={label}
                  link={link}
                  sx={{ ...handleFont(newData, 'm') }}
                />
              );
            })}
          </Grid>
        </Grid>
      </>
    );
  };