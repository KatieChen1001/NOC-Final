// Nature of Code Fall 2017 --- NYU Shanghai 
// Final Project: Tornado Simulation
// Katie Chen


var canvasSize = 800;
var resolution = 30;
var p = [];

var planeSize = 200;
var planeHeight = -100;
var numOfP = 100; // number of particles per plane
var initLayer = 20;



// ============================ adding GUI ============================ //
var params = {
  debugMode: false, //create a debug mode, initialize it as a boolean
  maxDesiredVel: 2,
  maxSteerForce: 0.2,
  viewPointY: -200,
  viewPointZ: -600,
  rotX: 0,
  numOfLayer:0,

  shapeParameter: 50,

  transform: function() {
    for ( var i = 0; i < p.length; i++){
      p[i].changeShape(params.shapeParameter);
    }
  },

}

var gui = new dat.gui.GUI();
gui.add(params, 'numOfLayer').listen();
gui.add(params, 'maxDesiredVel', 1, 7, 1);
gui.add(params, 'maxSteerForce', 0.1, 0.7, 0.1);
gui.add(params, 'rotX', -90, 90, 10);
gui.add(params, 'viewPointY', -1000, 1000, 50);
gui.add(params, 'viewPointZ', -1000, 1000, 50);
gui.add(params, 'shapeParameter', -50, 50, 10);
gui.add(params, 'transform');

function setup() {
  createCanvas(canvasSize, canvasSize, WEBGL);

  for ( var i = 0; i < initLayer; i++){
    p.push(new ParticleSystem(numOfP + i * 10, planeSize + i * 30,planeHeight + i * 40));
    p[i].flowField();
  }
}

function draw() {
  scale(1, -1, 1);                        // scale the canvas --- reverse the y-axis
  background(0);                          // background color 
  // orbitControl();                         // drag mouse to move around
  
  translate(0, params.viewPointY, params.viewPointZ);
  rotateX(radians(params.rotX));
  for (var i = 0; i < p.length; i++){
    p[i].run(params.maxDesiredVel + i * 0.1, params.maxSteerForce);
  }  
}

function keyPressed() {
  if (keyCode === ENTER){
    for (var i = 0; i < p.length; i++){
      p[i].isExploded = true;
      p[i].explode(5, 2);
    }  
  }
}