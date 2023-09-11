export default function imageList(gridSize = 12) {
  if (gridSize % 2 !== 0) gridSize = 12;
  const imageList = [
    "boy",
    "boy",
    "cat",
    "cat",
    "ostrich",
    "ostrich",
    "watermelon",
    "watermelon",
    "detective",
    "detective",
    "lion",
    "lion",
    "parrot",
    "parrot",
    "tiger",
    "tiger",
  ];

  return imageList
    .slice(0, gridSize)
    .sort(() => (Math.random() > 0.5 ? 1 : -1));
}
