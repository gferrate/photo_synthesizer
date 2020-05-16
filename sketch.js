var img;
var waveSelector;
var waveSelector2;

function setup() {
  createCanvas(1200, 400);
  img = loadImage('assets/test.jpg');
  waveSelector = new WaveSelector(130, 90, 120, 110, 'green');
  waveSelector2 = new WaveSelector(130, 90, 200, 200, 'red');
}

function draw() {
  img.resize(600, 400);
  image(img, 0, 0);
  waveSelector.draw();
  waveSelector2.draw();
}


function mousePressed() {
  waveSelector.set_mouse_pressed();
  waveSelector2.set_mouse_pressed();
}


function mouseReleased() {
  waveSelector.set_mouse_released();
  waveSelector2.set_mouse_released();
}
