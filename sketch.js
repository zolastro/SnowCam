let snow = [];
let gravity;
let capture;
let textures = [];
let spritesheet;

function preload() {
  spritesheet = loadImage('assets/snowflakes32.png');
}

function setup() {
  frameRate(60);
  createCanvas(screen.width, screen.height);
  
  //Capture webcam
  capture = createCapture(VIDEO);  
  capture.size(screen.width, screen.height);
  
  gravity =  createVector(0, 0.01);
  
  //Get all the textures from the spritesheet
  for (let x = 0; x < 512; x += 32) {
    for (let y = 0; y < 512; y += 32) {
      let img = spritesheet.get(x, y, 32, 32);
      textures.push(img);
    } 
  }

  //Create 200 snowflakes with random textures
  for(let i = 0; i < 200; i++) {
    snow.push(new Snowflake(random(textures)));
  }

}

function draw() {
  background(0);
  image(capture, 0, 0, screen.width, screen.height);
  for (flake of snow) {
    flake.applyForce(gravity);
    flake.render();
    flake.update();
  }
}
