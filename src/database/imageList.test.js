import imageList from "./imageList.js";

describe("imageList", () => {
  it("should return an array of image IDs. If no argument is passed to the function, the length of the resulting array should be 12.", () => {
    expect(imageList().length).toBe(12);
  });
  it("should return an array of image IDs. The length of the resulting array should be determined by the value of the argument passed to the function.", () => {
    expect(imageList(4).length).toBe(4);
    expect(imageList(12).length).toBe(12);
    expect(imageList(16).length).toBe(16);
  });
  it("should return an array of 12 image IDs if the argument passed to the function is an odd number.", () => {
    expect(imageList(1).length).toBe(12);
    expect(imageList(11).length).toBe(12);
  });
});
