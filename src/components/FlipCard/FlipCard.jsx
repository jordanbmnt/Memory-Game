import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/material";
import "./FlipCard.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setCardFlipCount,
  setCurrentCard,
  setFlippedCards,
  setPreviousCard,
  setSecondClick,
  setStartTime,
} from "../../redux/reducer/cardFlipSlice";
import { useEffect } from "react";
import cardFlipAction from "../../boardFunctions/cardFlipAction.js";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function FlipCard(props) {
  const imageId = "flip-card-back " + props.flipCardBack;
  const dispatch = useDispatch();
  const previousCard = useSelector((state) => state.cardFlipper.previousCard);
  const currentCard = useSelector((state) => state.cardFlipper.currentCard);
  const secondCardClick = useSelector((state) => state.cardFlipper.secondClick);
  const flippedCards = useSelector((state) => state.cardFlipper.flippedCards);
  const startTime = useSelector((state) => state.cardFlipper.startTime);

  useEffect(() => {
    if (secondCardClick) {
      if (currentCard.id !== previousCard.id) {
        setTimeout(() => {
          if (document.getElementById(previousCard.index))
            document.getElementById(previousCard.index).style.transform = "";
          if (document.getElementById(previousCard.index))
            document.getElementById(previousCard.index).style.transition = "";
          if (document.getElementById(currentCard.index))
            document.getElementById(currentCard.index).style.transform = "";
          if (document.getElementById(currentCard.index))
            document.getElementById(currentCard.index).style.transition = "";
        }, 500);
      } else {
        dispatch(setFlippedCards(currentCard.index));
        dispatch(setFlippedCards(previousCard.index));
      }
      dispatch(
        setPreviousCard({
          id: null,
          index: null,
        })
      );
      dispatch(
        setCurrentCard({
          id: null,
          index: null,
        })
      );
      dispatch(setSecondClick(false));
    }
  }, [
    currentCard.id,
    currentCard.index,
    dispatch,
    previousCard.id,
    previousCard.index,
    secondCardClick,
  ]);

  const onClickHandler = (e) => {
    const mainCard = e.target.parentNode.className;
    const elementData = {
      id: props.flipCardBack,
      index: props.index,
    };
    if (
      mainCard === "flip-card-inner" &&
      !flippedCards.includes(elementData.index)
    ) {
      dispatch(setCardFlipCount());
      if (!startTime) dispatch(setStartTime(new Date().getTime()));
      cardFlipAction(e, props);
      if (previousCard.id === null) {
        dispatch(setPreviousCard(elementData));
        dispatch(setCurrentCard(elementData));
      } else if (
        previousCard.id !== null &&
        previousCard.index !== elementData.index &&
        previousCard.id === currentCard.id
      ) {
        dispatch(setCurrentCard(elementData));
        dispatch(setSecondClick(true));
      }
    }
  };

  return (
    <Container
      onClick={(e) => {
        onClickHandler(e);
      }}
      className='flip-card'
    >
      <div data-testid='card' className='flip-card-inner'>
        <Item className='flip-card-front'></Item>
        <Item className={imageId}></Item>
      </div>
    </Container>
  );
}
