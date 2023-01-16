import { Info, Link } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
import { handleFont } from '../renderers/helper';
import RenderField from './RenderField';

interface RenderKeyValueProps {
    newData: any,
    key: string,
    type: 'link' | 'default'
}

export default function RenderKeyValueFields ({
    newData,key,type}: RenderKeyValueProps) {
    if (!newData[key]) return <></>;
    if (newData[key].items.length === 0 && newData[key].heading === '')
      return <></>;
  
    return (
      <>
        <Grid item xs={1} key={`${key}Icon`}>
          {type === 'link' ? (
            <Link sx={{ color: theme => theme.palette.primary.main }} />
          ) : (
            <Info sx={{ color: theme => theme.palette.primary.main }} />
          )}
        </Grid>
        <Grid item xs={11} key={`${key}Body`}>
          <Typography sx={{ fontWeight: 'bold', ...handleFont(newData, 't') }}>
            {newData[key].heading}
          </Typography>
          <Grid container spacing={0}>
            {newData[key].items.map((item: any, index: Number) => {
              if (item.value === '') return <></>;
              const value = type === 'link' ? `${item.label}` : item.value;
              const label = type === 'link' ? undefined : item.label;
              const link = type === 'link' ? item.value : undefined;
              const icon = type === 'link' ? 'link' : undefined;
              return (
                <RenderField
                  key={`${key}${index}`}
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