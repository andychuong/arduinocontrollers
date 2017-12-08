var serial;
var portName = 'COM7';

//Game
var paddleA, paddleB, ball, wallTop, wallBottom;
var MAX_SPEED = 10;
var globalX;
var globalY;

var paddle1x;
var paddle1y;
var paddle2x;
var paddle2y;

function setup() {
  createCanvas(800,400);
  //frameRate(6);
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);  // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
  serial.list();                      // list the serial ports
  serial.open(portName);              // open a serial port
  
  paddleA = createSprite(30, height/2, 10, 100);
  paddleA.immovable = true;
  
  paddleB = createSprite(width-28, height/2, 10, 100);
  paddleB.immovable = true;
  
  wallTop = createSprite(width/2, -30/2, width, 30);
  wallTop.immovable = true;
  
  wallBottom = createSprite(width/2, height+30/2, width, 30);
  wallBottom.immovable = true;
  
  ball = createSprite(width/2, height/2, 10, 10);
  ball.maxSpeed = MAX_SPEED;
  
  paddleA.shapeColor = paddleB.shapeColor =ball.shapeColor = color(255,255,255);
  
  ball.setSpeed(MAX_SPEED, -180);
}

function draw() {
  background(0);
  
  // paddleA.position.y = constrain(mouseY, paddleA.height/2, height-paddleA.height/2);
  paddleA.position.y = paddle1y;
  paddleB.position.y = paddle2y;
  
  ball.bounce(wallTop);
  ball.bounce(wallBottom);
  
  if(ball.bounce(paddleA)) {
    var swing = (ball.position.y-paddleA.position.y)/3;
    ball.setSpeed(MAX_SPEED, ball.getDirection()+swing);
  }
  
  if(ball.bounce(paddleB)) {
    var swing = (ball.position.y-paddleB.position.y)/3;
    ball.setSpeed(MAX_SPEED, ball.getDirection()-swing);
  }
  
  if(ball.position.x<0) {
  ball.position.x = width/2;
  ball.position.y = height/2;
  ball.setSpeed(MAX_SPEED, 0);
  }
  
  if(ball.position.x>width) {
  ball.position.x = width/2;
  ball.position.y = height/2;
  ball.setSpeed(MAX_SPEED, 180);
  }
  
  drawSprites();
  
}

function serialEvent() {
  // read a string from the serial port
  // until you get carriage return and newline:
  var inString = serial.readStringUntil('\r\n');
  //check to see that there's actually a ssetring there:
  if (inString.length > 0) {
    if (inString !== 'hello') {           // if you get hello, ignore it
      var sensors = split(inString, ','); // split the string on the commas
      if (sensors.length > 15) {           // if there are three elements
        // paddle1x = map(sensors[0], 0, 1023, 0, height);
        paddle1y = map(sensors[1], 0, 1023, 0, height);

        // paddle2x = sensors[3];
        paddle2y = map(sensors[4], 0 , 1023, 0, height);        
      }
        // circleColor = 255 - (sensors[2] * 255);      // element 2 is the button
      }
    }
    serial.write('x'); // send a byte requesting more serial data 
  }
}

// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 print(i + " " + portList[i]);
 }
}
 
function serverConnected() {
 print('connected to server.');
}
 
function portOpen() {
 print('the serial port opened.')
}
 
function serialError(err) {
 print('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
 print('The serial port closed.');
}


function closingCode(){
  serial.close(portName);
  return null;
}

window.onbeforeunload = closingCode;