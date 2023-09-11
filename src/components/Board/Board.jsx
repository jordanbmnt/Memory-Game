import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import FlipCard from "../FlipCard/FlipCard";
import imageList from "../../database/imageList.js";
import { useDispatch, useSelector } from "react-redux";
import { setImageList } from "../../redux/reducer/cardFlipSlice";
import { useEffect } from "react";

export default function BasicGrid(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setImageList(imageList(props.totalCards)));
  }, [dispatch, props.totalCards]);

  const images = useSelector((state) => state.cardFlipper.imageList);

  return (
    <Box
      className='flip-card-container'
      sx={{ margin: "auto", scale: props.scale }}
    >
      <Grid container spacing={props.spacing}>
        {images.map((image, i) => (
          <Grid key={i} xs={parseInt(props.rows)}>
            <FlipCard index={i} flipCardBack={image} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
