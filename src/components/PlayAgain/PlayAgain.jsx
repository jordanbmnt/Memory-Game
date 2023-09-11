import { Container, Paper } from "@mui/material";
import ResetButton from "../ResetButton/ResetButton";

export default function PlayAgain(props) {
  let visible = "none";
  if (props.visible) visible = "block";
  if (!props.visible) visible = "none";

  const timeTaken = props.timeCounter(props.timeTaken);
  return (
    <Paper
      sx={{
        display: visible,
        position: "absolute",
        zIndex: "1000",
        width: "100vw",
        height: "100vh",
        backgroundImage: "linear-gradient(164deg, #162238a3, #162238d0)",
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexFlow: "column",
          justifyContent: "center",
          position: "absolute",
          left: "25vw",
          top: "37.5vh",
          width: "50vw",
          height: "32vh",
          border: "5px solid black",
          color: "white",
          borderRadius: "13px",
          backgroundImage: "linear-gradient(164deg, #162238a3, #162238d0)",
        }}
      >
        <h2>
          Congratulations!!! <br /> You got all the cards{" "}
        </h2>
        <div style={{ paddingBottom: "15px" }}>
          {timeTaken} and flipped {`${props.flips} times`}
        </div>
        <ResetButton message='play again' />
      </Container>
    </Paper>
  );
}
