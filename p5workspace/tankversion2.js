//Serial Variables
var serial;          // variable to hold an instance of the serialport library
var portName = 'COM9';  // fill in your serial port name here

//Global Game Variables ---------------
var sensorX1;
var sensorY1;
var sensorR1;
var sensorS1;

var x1;
var y1;
var rotation1;
var ready1;
var fire1;
var points1;
var bullets1;
var hearts1;

var sensorX2;
var sensorY2;
var sensorR2;
var sensorS2;

var x2;
var y2;
var rotation2;
var ready2;
var fire2;
var points2;
var bullets2;
var hearts2;

var wins;
var gameState;
// 0 = start screen
// 1 = in progress
// 2 = end 


//Setup Function ----------------------
function setup() {
  createCanvas(windowWidth, windowHeight);
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);       // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
  serial.list();                      // list the serial ports
  serial.open(portName);              // open a serial port

  wins = 5;

  // Player 1
  ready1 = false;
  player1 = createSprite(400, 200, 50, 50);
  // player1.shapeColor = 'blue';
  blueTank = loadImage("assets/bluetank_small.png");
  blueTank2 = loadImage("assets/bluetank_small2.png");
  player1.addImage(blueTank);
  x1 = 90;
  y1 = 140;
  points1 = 0;
  bullets1 = new Group();

  // Player 2
  ready2 = false;
  player2 = createSprite(400, 200, 50, 50);
  // player2.shapeColor = 'green';
  greenTank = loadImage("assets/greentank_small.png");
  greenTank2 = loadImage("assets/greentank_small2.png");
  player2.addImage(greenTank);
  x2 = windowWidth - 90;
  y2 = windowHeight -93;
  points2 = 0;
  bullets2 = new Group();

  heart = loadImage("assets/heart.png");
}

//Draw Function -----------------------
function draw() {
  background('white');

    fill(200);
    textSize(80);
    // textFont(fontTitle);
    text("Battle Tanks", windowWidth/2 -200, 70);

    //rectangle box
    stroke(0);
    strokeWeight(2);
    rect(50,100,windowWidth - 100, windowHeight - 150);
    strokeWeight(1);

    //middle bar
    fill(0);
    rect(windowWidth/2 -10,100, 20, windowHeight - 150);

    
    // Player 1 Location
    player1.position.x = x1;
    player1.position.y = y1;

    // Player 1 Shooting @@@@@@@@@@@
    if(keyWentDown("c")){
      console.log('1 shoot');
        var bullet1 = createSprite(player1.position.x, player1.position.y, 10, 10);
        bullet1.setSpeed(10+player1.getSpeed(), player1.rotation);
        bullet1.life = 160;
        bullet1.shapeColor = 'black';
        bullets1.add(bullet1);
      }
     
      // Player 2 Location
    player2.position.x = x2;
    player2.position.y = y2;

    // Player 2 Shooting @@@@@@@@@@@
      if(keyWentDown("h")){
        // console.log('c pressed');
        var bullet2 = createSprite(player2.position.x, player2.position.y, 10, 10);
        bullet2.setSpeed(10+player2.getSpeed(), player2.rotation);
        bullet2.life = 160;
        bullet2.shapeColor = 'black';
        bullets2.add(bullet2);
      }

      //detect hits
    bullets1.overlap(player2, oneHitTwo);
    bullets2.overlap(player1, twoHitOne);

    //draw hearts
    hearts1 = wins - points2;
    hearts2 = wins - points1;

    for(var i = 0; i < hearts1; i++){
      image(heart, 50 + (22*i), windowHeight - 48);
    }

    for(var j = 0; j < hearts2; j++){
      image(heart, windowWidth - (70 + (22*j) ), windowHeight - 48);
    }
    

    // Check Win

    if(points1 == wins || points2 == wins){
      gameState = 2;

    }

    // Update Values
    drawSprites();
    updateValues();
}

  //Guide 1:
  //A0 ~ [0]: Horiz (x)
  //A1 ~ [1]: Verti (y)
  //D2 ~ [6]: Joystick Button - ??
  //D3 ~ [7]: Small Button ( - )
  //D4 ~ [8]: Blue Button (Shoot)
  //D5 ~ [9]: Red Button (Reload) 

  //Guide 2:
  //A3 ~ [3]: Horiz (x)
  //A4 ~ [4]: Verti (y)
  //D7 ~ [11]: Joystick Button - ??
  //D8 ~ [12]: Small Buttom ( - )
  //D9 ~ [13]: Small Button (Reset)
  //D10 ~ [14]: Red Button (Reload)

//Interpret serial data here ----------
function serialEvent() {
  // read a string from the serial port
  // until you get carriage return and newline:
  var inString = serial.readStringUntil('\r\n');
  //check to see that there's actually a ssetring there:
  if (inString.length > 0) {
    if (inString !== 'hello') {           // if you get hello, ignore it
      var sensors = split(inString, ','); // split the string on the commas
      if (sensors.length > 15) {           // if there are sixteen elements (6 analog, 10 digital)
      //Use sensor data here:

      //Player 1:
      sensorX1 = sensors[0];
      sensorY1 = sensors[1];
      // console.log(sensors);
      sensorS1 = sensors[8];
      // console.log(sensors[8]);
      // console.log(sensors);


      

      //Player 2:
      sensorX2 = sensors[3];
      sensorY2 = sensors[4];

      }
    }
    serial.write('x'); // send a byte requesting more serial data 
  }
}

function updateValues(){ // update sketch.js variables with sensor data
  console.log(player1.rotation);
  //> 0
  // < 180
  // down 90
  // up 270
  //// Player 1 ------------
  // X1
  //left
  if(sensorX1 < 470){
    if(x1 > 90){
      x1-=3;

      // console.log(x1);
    }
    // player1.rotation -= 4;
  }//right
  if(sensorX1 > 530){
    if(x1 < windowWidth/2 - 45){
      x1+=3;
      // console.log(x1);
    }
    // player1.rotation += 4;
  }
  
  // Y1
  //down
  if(sensorY1 > 530){
    if(y1 < windowHeight - 90){
      y1 += 3;
      // console.log(y1);
      // player1.addSpeed(-.2, player1.rotation);
      // console.log(player1.rotation);
    }
  }//up
  if(sensorY1 < 470){

    if(y1 > 140){
      y1 -= 3;
      // console.log(y1);
      // player1.addSpeed(.2, player1.rotation);
    }
  }
  // Rotation 1
  //up
  if(sensorY1 < 470){ // check up greater than 470, less than 530 -> between 470 and 530
    if(sensorX1 > 470){ // check not left
      if(sensorX1 < 530){ //check not right
        player1.rotation = 270;
      }
    }
  }
  //down
  if(sensorY1 > 530){ // check down greater than 470, less than 530 -> between 470 and 530
    if(sensorX1 > 470){ // check not left
      if(sensorX1 < 530){ //check not right
        player1.rotation = 90;
      }
    }
  }
  //right
  if(sensorX1 > 530){ // check right
    if(sensorY1 < 530){ //check not down
      if(sensorY1 > 470){ //check not up
        player1.rotation = 0;
      }
    }
  }
  //left
  if(sensorX1 < 470){ // check right
    if(sensorY1 < 530){ //check not down
      if(sensorY1 > 470){ //check not up
        player1.rotation = 180;
      }
    }
  }
  //top right
  if(sensorY1 < 470){ //up
    if(sensorX1 > 530){ //right
      player1.rotation = 315;
    }
  }
  //bottom right
  if(sensorY1 > 530){ //up
    if(sensorX1 > 530){ //right
      player1.rotation = 45;
    }
  }
  //bottom left
  if(sensorY1 > 530){ //down
    if(sensorX1 < 470){ //left
      player1.rotation = 135;
    }
  }
  //top left
  if(sensorY1 < 470){ //up
    if(sensorX1 < 470){ //left
      player1.rotation = 225;
    }
  }

  // rotation1 = map(sensorR1, 0, 1023, -90, 90);
  // player1.rotation = rotation1;

  //// Player 2 ------------

  // X2
  // left
  if(sensorX2 < 470){
    if(x2 > windowWidth/2 + 45){
      x2 -= 3;

      // console.log(x2);
    }
    // player2.rotation -= 4;
  }
  // right
  if(sensorX2 > 530){
    if(x2 < windowWidth - 90){
      x2 += 3;
    }
    // player2.rotation += 4;
  }
  // Y2
  // down
  if(sensorY2 > 530){
    if(y2 < windowHeight -93){
      y2 += 3;
      // console.log(y2);
    }
  }
  // up
  if(sensorY2 < 470){
    if(y2 > 140){
      y2 -= 3;
      // console.log(y1);
    }
  }
  // Rotation 2
  //up
  if(sensorY2 < 470){ // check up greater than 470, less than 530 -> between 470 and 530
    if(sensorX2 > 470){ // check not left
      if(sensorX2 < 530){ //check not right
        player2.rotation = 270;
      }
    }
  }
  //down
  if(sensorY2 > 530){ // check down greater than 470, less than 530 -> between 470 and 530
    if(sensorX2 > 470){ // check not left
      if(sensorX2 < 530){ //check not right
        player2.rotation = 90;
      }
    }
  }
  //right
  if(sensorX2 > 530){ // check right
    if(sensorY2 < 530){ //check not down
      if(sensorY2 > 470){ //check not up
        player2.rotation = 0;
      }
    }
  }
  //left
  if(sensorX2 < 470){ // check right
    if(sensorY2 < 530){ //check not down
      if(sensorY2 > 470){ //check not up
        player2.rotation = 180;
      }
    }
  }
  //top right
  if(sensorY2 < 470){ //up
    if(sensorX2 > 530){ //right
      player2.rotation = 315;
    }
  }
  //bottom right
  if(sensorY2 > 530){ //up
    if(sensorX2 > 530){ //right
      player2.rotation = 45;
    }
  }
  //bottom left
  if(sensorY2 < 470){ //down
    if(sensorX2 < 470){ //left
      player2.rotation = 225;
    }
  }
  //top left
  if(sensorY2 > 530){ //down
    if(sensorX2 < 470){ //left
      player2.rotation = 135;
    }
  }
  // rotation2 = map(sensorR2, 0, 1023, 270, 90);
  // player2.rotation = rotation2;cccccccccc
  // console.log(rotation2);

}

function oneHitTwo(bullet1){
  // player2.shapeColor = "orange";
  points1++;
  bullet1.remove();
}

function twoHitOne(bullet2){
  points2++;
  bullet2.remove();
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