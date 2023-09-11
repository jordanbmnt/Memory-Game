import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Board from "./components/Board/Board";
import ResetButton from "./components/ResetButton/ResetButton";
import PlayAgain from "./components/PlayAgain/PlayAgain";
import { useEffect, useState } from "react";
import { setPopUp } from "./redux/reducer/cardFlipSlice";
import DimensionBox from "./components/DimensionBox/DimensionBox";
import { Button } from "@mui/material";
import WidgetsIcon from "@mui/icons-material/Widgets";
import { Remove } from "@mui/icons-material";

export default function App() {
  const [toggleVisibility, setVisibility] = useState(true);
  const [timeDuration, settimeDuration] = useState("");
  const dimensions = useSelector((state) => state.cardFlipper.boardDimensions);
  const rows = dimensions.rows;
  const totalCards = dimensions.cardCount;
  const spacing = dimensions.cardDistance;
  const scale = dimensions.scale.toString();
  const flippedCards = useSelector((state) => state.cardFlipper.flippedCards);
  const popUp = useSelector((state) => state.cardFlipper.popUp);
  const startTime = useSelector((state) => state.cardFlipper.startTime);
  const flips = useSelector((state) => state.cardFlipper.cardFlipCount);
  const dispatch = useDispatch();
  const [returnTime, setReturnTime] = useState("");

  const timeCount = (second) => {
    let minutes;
    let hours;
    let seconds = second;
    if (seconds >= 60) {
      minutes = Math.floor(seconds / 60);
      seconds = seconds - minutes * 60;
    } else if (minutes >= 60) {
      hours = Math.floor(minutes / 60);
      minutes = minutes - hours * 60;
    }
    return `Your Time: ${hours || 0} hours, ${minutes || 0} minutes and ${
      seconds || 0
    } seconds`;
  };

  useEffect(() => {
    if (startTime) {
      const interval = setInterval(() => {
        const currentDateTime = new Date().getTime();
        const sec = Math.floor((currentDateTime - startTime) / 1000);
        setReturnTime(timeCount(sec));
      }, 1000);

      setReturnTime(timeCount(""));
      return () => clearInterval(interval);
    }
  }, [startTime]);

  useEffect(() => {
    if ([...new Set(flippedCards)].length === dimensions.cardCount) {
      setTimeout(() => {
        const currentDateTime = new Date().getTime();
        const timeDurationSec = Math.floor(
          (currentDateTime - startTime) / 1000
        );
        settimeDuration(timeDurationSec);
        dispatch(setPopUp());
      }, 900);
    }
  }, [dimensions.cardCount, dispatch, flippedCards, startTime]);

  useEffect(() => {
    if (popUp && toggleVisibility) setVisibility(false);
  }, [popUp, toggleVisibility]);

  return (
    <div className='App'>
      <PlayAgain
        timeCounter={timeCount}
        flips={flips}
        timeTaken={timeDuration}
        visible={popUp}
      />
      <Button
        sx={{
          backgroundColor: "#162238d0",
          color: "white",
          left: 10,
          position: "absolute",
          top: 10,
        }}
        onClick={() => setVisibility(!toggleVisibility)}
      >
        {toggleVisibility ? <Remove /> : <WidgetsIcon />}
      </Button>
      {toggleVisibility ? <DimensionBox /> : ""}
      <Board
        rows={rows}
        totalCards={totalCards}
        spacing={spacing}
        scale={scale}
      />

      <h3 id='timeTaken' data-testid='timeTaken'>
        {startTime ? returnTime : `Your Time: 0 hours, 0 minutes and 0 seconds`}{" "}
        | {`You flipped the cards ${flips} times`}
      </h3>
      <ResetButton pos='true' message='RESET' />
    </div>
  );
}
