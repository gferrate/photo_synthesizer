var img;
var pitchWaveSelector;
var pichWaveSelector;
var image_threshold;
let soundLoop;
var playing = false;
var osc;
var noteIndex = 0;



function preload() {
  img = loadImage('assets/test.jpg');
}

function onSoundLoop(timeFromNow) {
  let notes = pitchWaveSelector.notes;
  noteIndex = (soundLoop.iterations - 1) % notes.length;
  let note = notes[noteIndex];
  if (note != -1) {
    osc.amp(1);
    osc.freq(note, 0.1);
  } else {
    osc.amp(0);
  }
}

function avg(t) {
  let sum = 0;
  for (let item of t) {
    sum += item;
  }
  return sum / t.length;
}

function calculate_threshold() {
  var _min = 255;
  var _max = 0;
  for (var i = 0; i < img.width; i += 2) {
    for (var j = 0; j < img.height; j += 2) {
      var average = avg(img.get(i, j).slice(1, 3));
      if (average > _max) {
        _max = average;
      } else if (average < _min) {
        _min = average;
      }
    }
  }
  image_threshold = (_max + _min) / 2;
}

function setup() {
  var canvas = createCanvas(800, 400);
  canvas.parent('canvas');
  calculate_threshold();
  let intervalInSeconds = 0.05;
  osc = new p5.Oscillator('sine');
  osc.start();
  soundLoop = new p5.SoundLoop(onSoundLoop, intervalInSeconds);
  soundLoop.start();
  pitchWaveSelector = new WaveSelector(130, 90, 120, 110, 'green');
  //pichWaveSelector = new WaveSelector(130, 90, 200, 200, 'red');
}

function draw() {
  background(255);
  image(img, 0, 0, 600, 400);
  //userStartAudio();
  pitchWaveSelector.draw();
  //pichWaveSelector.draw();
}


function mousePressed() {
  pitchWaveSelector.set_mouse_pressed();
  //pichWaveSelector.set_mouse_pressed();
}


function mouseReleased() {
  pitchWaveSelector.set_mouse_released();
  //pichWaveSelector.set_mouse_released();
}
