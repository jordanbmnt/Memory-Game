export default function cardFlipAction(e, props) {
  let elementStyle = e.target.parentNode.style;
  if (elementStyle.transition === "") {
    elementStyle.transition = "0.8s";
    elementStyle.transform = "rotateY(180deg) translate(-15px)";
    e.target.parentNode.id = props.index;
  }
}
