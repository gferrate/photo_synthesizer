var img;
var pitchWaveSelector;
var ampWaveSelector;
var image_threshold;
let soundLoop;
var osc;

function preload() {
  img = loadImage('assets/test.jpg');
}

function onSoundLoop(timeFromNow) {
  let notes = pitchWaveSelector.notes;
  let amp_idx = ampWaveSelector.next_index();
  let amplitude = ampWaveSelector.raw_notes[amp_idx];
  if (amplitude != -1) {
    amplitude = map(amplitude, 0, 1, 0.5, 0);
  } else {
    amplitude = 0.3;
  }
  let note = notes[pitchWaveSelector.next_index()];
  amplitude = amplitude || 0.3;
  if (note != -1) {
    osc.amp(amplitude);
    osc.freq(note, 0.05);
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
  image_threshold = (_max + _min) / 2 - 20;
}

function setup() {
  userStartAudio();
  var canvas = createCanvas(800, 400);
  canvas.parent('canvas');
  calculate_threshold();
  let intervalInSeconds = 0.05;
  osc = new p5.Oscillator('sine');
  osc.start();
  soundLoop = new p5.SoundLoop(onSoundLoop, intervalInSeconds);
  soundLoop.start();
  pitchWaveSelector = new WaveSelector(130, 90, 23, 100, 'green', 600, 0);
  ampWaveSelector = new WaveSelector(130, 90, 33, 231, 'red', 600, 100);
}

function draw() {
  img.resize(600, 400);
  background(255);
  image(img, 0, 0, 600, 400);
  pitchWaveSelector.draw();
  ampWaveSelector.draw();
}


function mousePressed() {
  pitchWaveSelector.set_mouse_pressed();
  ampWaveSelector.set_mouse_pressed();
}


function mouseReleased() {
  pitchWaveSelector.set_mouse_released();
  ampWaveSelector.set_mouse_released();
}
