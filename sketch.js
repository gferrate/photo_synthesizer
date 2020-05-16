var img;
var waveSelector;

function setup() {
  createCanvas(1200, 400);
  img = loadImage('assets/test.jpg');
  waveSelector = new WaveSelector(130, 90, 120, 110);
}

function draw() {
  img.resize(600, 400);
  image(img, 0, 0);
  waveSelector.draw();
}


function mousePressed() {
  if (waveSelector.rollover) {
    waveSelector.offsetX = waveSelector.x - mouseX;
    waveSelector.offsetY = waveSelector.y - mouseY;
    waveSelector.xBeforeDragging = waveSelector.x;
    waveSelector.wBeforeDragging = waveSelector.w;
    waveSelector.yBeforeDragging = waveSelector.y;
    waveSelector.hBeforeDragging = waveSelector.h;
    waveSelector.dragging = true;
  }
}


function mouseReleased() {
  waveSelector.dragging = false;
  waveSelector.resizing = false;
  waveSelector.resizingL = false;
  waveSelector.resizingR = false;
  waveSelector.resizingT = false;
  waveSelector.resizingB = false;
}
