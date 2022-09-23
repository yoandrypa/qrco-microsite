import {memo} from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import {CardDataProps} from "../../types/types";
import SquareSelector from "../../helperComponents/SquareSelector";

const RenderEasiness = ({data, setData}: CardDataProps) => {
  const handleSelection = (item: string) => {
    const x = JSON.parse(JSON.stringify(data));
    if (!x.easiness) {
      x.easiness = {};
    }
    if (!x.easiness[item]) {
      x.easiness[item] = true;
    } else {
      delete x.easiness[item];
      if (!Object.keys(x.easiness).length) {
        delete x.easiness;
      }
    }
    setData(x);
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Box sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: 'fit-content', margin: '0 auto'}}>
          <SquareSelector
            selected={data.easiness?.accessible || false}
            tooltips
            item="accessible"
            label="Accessible"
            handleSelection={handleSelection}/>
          <SquareSelector
            selected={data.easiness?.toilet || false}
            tooltips
            item="toilet"
            label="Toilets"
            handleSelection={handleSelection}/>
          <SquareSelector
            selected={data.easiness?.seat || false}
            tooltips
            item="seat"
            label="Seats"
            handleSelection={handleSelection}/>
          <SquareSelector
            selected={data.easiness?.child || false}
            tooltips
            item="child"
            label="Children friendly"
            handleSelection={handleSelection}/>
          <SquareSelector
            selected={data.easiness?.pets || false}
            tooltips
            item="pets"
            label="Pets friendly"
            handleSelection={handleSelection}/>
          <SquareSelector
            selected={data.easiness?.park || false}
            tooltips
            item="park"
            label="Parks or open spaces"
            handleSelection={handleSelection}/>
          <SquareSelector
            selected={data.easiness?.restaurant || false}
            tooltips
            item="restaurant"
            label="Restaurant"
            handleSelection={handleSelection}/>
          <SquareSelector
            selected={data.easiness?.cafe || false}
            tooltips
            item="cafe"
            label="Cafeteria"
            handleSelection={handleSelection}/>
          <SquareSelector
            selected={data.easiness?.bar || false}
            tooltips
            item="bar"
            label="Bar"
            handleSelection={handleSelection}/>
          <SquareSelector
            selected={data.easiness?.fastfood || false}
            tooltips
            item="fastfood"
            label="Fast food"
            handleSelection={handleSelection}/>
          <SquareSelector
            selected={data.easiness?.bed || false}
            tooltips
            item="bed"
            label="Bedrooms"
            handleSelection={handleSelection}/>
          <SquareSelector
            selected={data.easiness?.gym || false}
            tooltips
            item="gym"
            label="Sports friendly"
            handleSelection={handleSelection}/>
          <SquareSelector
            selected={data.easiness?.smoking || false}
            tooltips
            item="smoking"
            label="Smoking areas"
            handleSelection={handleSelection}/>
          <SquareSelector
            selected={data.easiness?.climate || false}
            tooltips
            item="climate"
            label="Climate"
            handleSelection={handleSelection}/>
          <SquareSelector
            selected={data.easiness?.training || false}
            tooltips
            item="training"
            label="Training"
            handleSelection={handleSelection}/>
          <SquareSelector
            selected={data.easiness?.parking || false}
            tooltips
            item="parking"
            label="Parking"
            handleSelection={handleSelection}/>
          <SquareSelector
            selected={data.easiness?.train || false}
            tooltips
            item="train"
            label="Train"
            handleSelection={handleSelection}/>
          <SquareSelector
            selected={data.easiness?.bus || false}
            tooltips
            item="bus"
            label="Bus"
            handleSelection={handleSelection}/>
          <SquareSelector
            selected={data.easiness?.taxi || false}
            tooltips
            item="taxi"
            label="Taxi"
            handleSelection={handleSelection}/>
        </Box>
      </Grid>
    </Grid>
  );
}

// @ts-ignore
const notRenderIf = (current, next) => {
  return current.data.easiness?.accessible === next.data.easiness?.accessible && current.data.easiness?.toilet === next.data.easiness?.toilet &&
    current.data.easiness?.seat === next.data.easiness?.seat && current.data.easiness?.child === next.data.easiness?.child &&
    current.data.easiness?.pets === next.data.easiness?.pets && current.data.easiness?.park === next.data.easiness?.park &&
    current.data.easiness?.restaurant === next.data.easiness?.restaurant && current.data.easiness?.cafe === next.data.easiness?.cafe &&
    current.data.easiness?.bar === next.data.easiness?.bar && current.data.easiness?.fastfood === next.data.easiness?.fastfood &&
    current.data.easiness?.bed === next.data.easiness?.bed && current.data.easiness?.gym === next.data.easiness?.gym &&
    current.data.easiness?.smoking === next.data.easiness?.smoking && current.data.easiness?.climate === next.data.easiness?.climate &&
    current.data.easiness?.training === next.data.easiness?.training && current.data.easiness?.parking === next.data.easiness?.parking &&
    current.data.easiness?.train === next.data.easiness?.train && current.data.easiness?.bus === next.data.easiness?.bus &&
    current.data.easiness?.taxi === next.data.easiness?.taxi;
}

export default memo(RenderEasiness, notRenderIf);
