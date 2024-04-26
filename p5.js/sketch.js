let img;
let segments = [];//where we will store each segment
let numSegments = 50; //how many segments to create

let pixeColour;
let drawSegments = true;

function preload() {
  img = loadImage("Assets/Mona_Lisa.jpg");
}

function setup() {
  createCanvas(img.width, img.height);

  let segWidth = img.width/numSegments;
  let segHeight = img.height/numSegments;

  for (let yPos = 0; yPos < img.height; yPos += segHeight) {
    for (let xPos = 0; xPos < img.width; xPos += segWidth) {
      let fillColor = img.get(xPos + segWidth/2, yPos +segHeight/2);
      let segment = new ImageSegment(xPos, yPos, segWidth, segHeight, fillColor);
      segments.push(segment); //add the segment to the end of the segments array
    }
  }

  pixeColour = color(0);
}

function draw() {
  if (drawSegments) {
    for (const segment of segments) {
      segment.draw();
    }
  } else {
    image(img, 0, 0);
  }

  stroke(255);
  fill(pixeColour);
  circle(mouseX, mouseY, 40);
}

function mouseMoved() {
  pixeColour = img.get(mouseX, mouseY); //read the colour under the mouse and assig to pixecolour
}

function keyPressed() {
  if (key == " ") {
    drawSegments = !drawSegments;
  }
}

class ImageSegment {

  constructor(xPos, yPos, width, height, fillColor) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = width;
    this.height = height;
    this.fillColor = fillColor;
  }

  draw() {
    fill(this.fillColor);
    stroke(0);
    rect(this.xPos, this.yPos, this.width, this.height);
  }
}