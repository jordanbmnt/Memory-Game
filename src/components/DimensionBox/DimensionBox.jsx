import { Button, Paper } from "@mui/material";
import "./DimensionBox.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setBoardDimensions,
  setImageList,
  setStateToInitialState,
} from "../../redux/reducer/cardFlipSlice";
import boardResetAction from "../../boardFunctions/boardResetAction";
import imageList from "../../database/imageList";

export default function DimensionBox() {
  const dispatch = useDispatch();
  const flippedCards = [
    ...new Set(useSelector((state) => state.cardFlipper.flippedCards)),
  ];
  const previousCard = useSelector(
    (state) => state.cardFlipper.previousCard
  ).index;

  const timeStarted = useSelector((state) => state.cardFlipper.startTime);
  const currentDimensions = useSelector(
    (state) => state.cardFlipper.boardDimensions.cardCount
  );
  const onClickHandler = (dimension) => {
    const buttonDimensions = dimension
      .split("x")
      .reduce((prev, cur) => prev * cur);
    const reset = boardResetAction(
      document,
      previousCard,
      flippedCards,
      timeStarted
    );
    if (reset) dispatch(setStateToInitialState());
    if (dimension === "2x2")
      dispatch(
        setBoardDimensions({
          rows: 6,
          cardCount: 4,
          cardDistance: 20,
          scale: 0.7,
        })
      );
    if (dimension === "2x3")
      dispatch(
        setBoardDimensions({
          rows: 4,
          cardCount: 6,
          cardDistance: 9,
          scale: 0.6,
        })
      );
    if (dimension === "2x4")
      dispatch(
        setBoardDimensions({
          rows: 3,
          cardCount: 8,
          cardDistance: 9,
          scale: 0.6,
        })
      );
    if (dimension === "3x4")
      dispatch(
        setBoardDimensions({
          rows: 3,
          cardCount: 12,
          cardDistance: 7,
          scale: 0.5,
        })
      );
    if (dimension === "4x4")
      dispatch(
        setBoardDimensions({
          rows: 3,
          cardCount: 16,
          cardDistance: 8,
          scale: 0.4,
        })
      );
    if (buttonDimensions === currentDimensions) {
      setTimeout(() => {
        dispatch(setImageList(imageList(currentDimensions)));
      }, 200);
    }
  };
  return (
    <Paper
      sx={{ backgroundColor: "#162238d0" }}
      className='dimension-box'
      elevation={3}
    >
      <Button
        onClick={() => {
          onClickHandler("2x2");
        }}
        variant='contained'
        size='small'
      >
        2x2
      </Button>
      <Button
        onClick={() => {
          onClickHandler("2x3");
        }}
        variant='contained'
        size='small'
      >
        2x3
      </Button>
      <Button
        onClick={() => {
          onClickHandler("2x4");
        }}
        variant='contained'
        size='small'
      >
        2x4
      </Button>
      <Button
        onClick={() => {
          onClickHandler("3x4");
        }}
        variant='contained'
        size='small'
      >
        3x4
      </Button>
      <Button
        onClick={() => {
          onClickHandler("4x4");
        }}
        variant='contained'
        size='small'
      >
        4x4
      </Button>
    </Paper>
  );
}
