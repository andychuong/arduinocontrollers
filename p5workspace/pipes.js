//Serial Variables
var serial;          // variable to hold an instance of the serialport library
var portName = 'COM7';  // fill in your serial port name here

//Global Game Variables ---------------
var MIN_OPENING = 250;

var y1;
var speed;
var s1;
var boxesX;

var player1;
var boxes;
var numboxes;
var ground;

var spacingCounter;
var maxPipes;

var gameOver;
var startGame;

//Setup Function ----------------------
function setup() {
  createCanvas(1200, 600);
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);       // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
  serial.list();                      // list the serial ports
  serial.open(portName);              // open a serial port


  player1 = createSprite(100, height/2 + 20, 40,40);
  player1.shapeColor = 'white';
  player1.rotateToDirection = true;

  boxesX = width;

  // player1.addImage();
  numboxes = 0;
  spacingCounter = 0;
  maxPipes = 2;

  // ground = createSprite(800/2, GROUND_Y+100); 

  boxes = new Group();
  gameOver = false;
  startGame = true;
  updateSprites(false);

  // camera.position.y = height/2;
}

//Draw Function -----------------------
function draw() {
  background(0, 134, 255);

  if(gameOver && s1 == 1)//Restart game
    newGame();

  if(!gameOver){//Run game

    player1.position.y = y1
    // console.log("Player 1 Y: " + player1.position.y);

    if(player1.overlap(boxes)){
      die();
    }

    if(frameCount%30 == 0) {
      var boxH = random(20,350);
      var boxT = createSprite(player1.position.x + width, boxH/2, 80, boxH);
      // console.log(width);
      boxT.shapeColor = 'black';
      boxes.add(boxT);

      var boxH2 = height - boxH - MIN_OPENING;
      var boxB = createSprite(player1.position.x + width, boxH + MIN_OPENING + (boxH2 / 2), 80, boxH2);
      boxB.shapeColor = 'black';
      boxes.add(boxB);
    }


    //get rid of passed pipes
    for(var i = 0; i<boxes.length; i++){
      boxes[i].position.x -= 5 + (1 * speed);
      if(boxes[i].position.x < player1.position.x-width/2){
        boxes[i].remove();
      }

    }
    // console.log(boxes);
  }

  drawSprites();
}

function die() {
  updateSprites(false);
  gameOver = true;   
}

function newGame() {
  boxes.removeSprites();
  gameOver = false;
  updateSprites(true);
  player1.position.x = 100;
  player1.position.y = height/2 + 20;
  startGame = true;

}

  //Guide 1:
  //A0 ~ [0]: Horiz (x) ~ orange
  //A1 ~ [1]: Verti (y) ~ yellow
  //D2 ~ [6]: 
  //D3 ~ [7]: Small Center Button (Pause) ~ purple
  //D4 ~ [8]: 
  //D5 ~ [9]: 
//Interpret serial data here ----------
function serialEvent() {
  // read a string from the serial port
  // until you get carriage return and newline:
  var inString = serial.readStringUntil('\r\n');
  //check to see that there's actually a ssetring there:
  if (inString.length > 0) {
    // console.log(inString);
    if (inString !== 'hello') {           // if you get hello, ignore it
      var sensors = split(inString, ','); // split the string on the commas
      if (sensors.length > 2) {           // if there are sixteen elements (6 analog, 10 digital)
      //Use sensor data here:

      //Player 1
        speed = map(sensors[0], 0, 1023, 1, 10); //speed, shouldn't be changed during a game.
        // console.log("sensors[1]: " + sensors[1]);
        y1 = map(sensors[1], 0, 1023, 0, height);

        s1 = sensors[7];

      }
    }

    serial.write('z'); // send a byte requesting more serial data 
    
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