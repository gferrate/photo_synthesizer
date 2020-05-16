var img;
var waveSelector;

function setup() {
  createCanvas(600, 400);
  img = loadImage('assets/test.jpg');
  waveSelector = new WaveSelector(130, 90, 120, 110);
}

function draw() {
  img.resize(600, 400);
  image(img, 0, 0);
  waveSelector.draw();
}


function mousePressed() {
  if (waveSelector.mouse_in_range()) {
    waveSelector.offsetX = waveSelector.x - mouseX;
    waveSelector.offsetY = waveSelector.y - mouseY;
    waveSelector.dragging = true;
  }
}


function mouseReleased() {
  waveSelector.dragging = false;
}
