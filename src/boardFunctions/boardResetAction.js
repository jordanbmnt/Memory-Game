export default function boardResetAction(doc, prev, flippedCards, timeStarted) {
  if (
    flippedCards.length > 0 ||
    typeof prev === "number" ||
    typeof timeStarted === "number"
  ) {
    for (const card of doc.getElementsByClassName("flip-card-inner")) {
      if (card.style.transform !== "") card.style.transform = "";
      card.style.transition = "";
    }
    return true;
  }
}
