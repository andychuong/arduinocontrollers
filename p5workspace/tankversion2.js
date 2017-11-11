//Serial Variables
var serial;          // variable to hold an instance of the serialport library
var portName = 'COM5';  // fill in your serial port name here

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

//Global Game Variables ---------------


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
  player1.shapeColor = 'blue';
  x1 = 90;
  y1 = 140;
  points1 = 0;

  // Player 2
  ready2 = false;
  player2 = createSprite(400, 200, 50, 50);
  player2.shapeColor = 'green';
  x2 = windowWidth - 90;
  y2 = windowHeight -93;
  points2 = 0;


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
    if(keyWentDown("x")){
      // console.log('x');
        // var bullet1 = createSprite(player1.position.x, player1.position.y, 10, 10);
        // bullet1.setSpeed(10+player1.getSpeed(), player1.rotation);
        // bullet1.life = 160;
        // bullet1.shapeColor = 'black';
        // bullets1.add(bullet1);
      }
     
      // Player 2 Location
    player2.position.x = x2;
    player2.position.y = y2;

    // Player 2 Shooting @@@@@@@@@@@
      if(keyWentDown("c")){
        // console.log('c pressed');
      //   var bullet2 = createSprite(player2.position.x, player2.position.y, 10, 10);
      //   bullet2.setSpeed(10+player2.getSpeed(), player2.rotation);
      //   bullet2.life = 160;
      //   bullet2.shapeColor = 'black';
      //   bullets2.add(bullet2);
      }

      //detect hits
    // bullets1.overlap(player2, oneHitTwo);
    // bullets2.overlap(player1, twoHitOne);

    //draw hearts
    hearts1 = wins - points2;
    hearts2 = wins - points1;

    for(var i = 0; i < hearts1; i++){
      // image(heart, 50 + (22*i), windowHeight - 48);
    }

    for(var j = 0; j < hearts2; j++){
      // image(heart, windowWidth - (70 + (22*j) ), windowHeight - 48);
    }
    

    // Check Win

    if(points1 == wins || points2 == wins){
      gameState = 2;

    }

    // Update Values
    drawSprites();
    // updateValues();
}

  //Guide 1:
  //A0 ~ [0]: Horiz (x)
  //A1 ~ [1]: Verti (y)
  //D2 ~ [6]: Joystick Button - ??
  //D3 ~ [7]: Blue Button (Shoot)
  //D4 ~ [8]: Red Button (Reload)
  //D5 ~ [9]: Small Button (Reset)

  //Guide 2:
  //A3 ~ [3]: Horiz (x)
  //A4 ~ [4]: Verti (y)
  //D7 ~ [11]: Joystick Button - ??
  //D8 ~ [12]: Blue Button (Shoot)
  //D9 ~ [13]: Red Button (Reload)
  //D10 ~ [14]: Small Button (Reset)

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
      x1 = map(sensors[0], 0, 1024, 0, width); // element 0 is the locH
        console.log("H :" + x1);
      y1 = map(sensors[1], 0, 1024, 0, height); // element 1 is the locV
        console.log("V :" + x2 + ", " + sensors[1]);

      //Player 2:
      x2 = map(sensors[3], 0, 1024, 0, width); // element 0 is the locH
        console.log("H :" + x1);
      y2 = map(sensors[4], 0, 1024, 0, height); // element 1 is the locV
        console.log("V :" + x2 + ", " + sensors[1]);

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