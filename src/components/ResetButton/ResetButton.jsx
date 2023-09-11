import { Button } from "@mui/material";
import boardResetAction from "../../boardFunctions/boardResetAction";
import { useDispatch, useSelector } from "react-redux";
import {
  setImageList,
  setPopUp,
  setStateToInitialState,
} from "../../redux/reducer/cardFlipSlice";
import imageList from "../../database/imageList";

export default function ResetButton(props) {
  const dispatch = useDispatch();
  const flippedCards = [
    ...new Set(useSelector((state) => state.cardFlipper.flippedCards)),
  ];
  const previousCard = useSelector(
    (state) => state.cardFlipper.previousCard
  ).index;
  const popUp = useSelector((state) => state.cardFlipper.popUp);
  const dimensions = useSelector((state) => state.cardFlipper.boardDimensions);
  const timeStarted = useSelector((state) => state.cardFlipper.startTime);

  const onClickHandler = () => {
    const reset = boardResetAction(
      document,
      previousCard,
      flippedCards,
      timeStarted
    );
    if (reset) {
      setTimeout(() => {
        dispatch(setStateToInitialState());
        dispatch(setImageList(imageList(dimensions.cardCount)));
      }, 200);
      if (popUp)
        setTimeout(() => {
          dispatch(setPopUp());
        }, 200);
    }
  };

  return (
    <Button
      sx={{
        position: props.pos && "absolute",
        bottom: props.pos && "5%",
      }}
      variant='contained'
      size='medium'
      onClick={() => {
        onClickHandler();
      }}
      data-testid='reset-button'
    >
      {props.message}
    </Button>
  );
}
