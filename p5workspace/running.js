//Serial Variables
var serial;          // variable to hold an instance of the serialport library
var portName = 'COM5';  // fill in your serial port name here

//Global Game Variables ---------------
var y1;
var x1;


//Setup Function ----------------------
function setup() {
  createCanvas(640, 480);
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);       // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
  serial.list();                      // list the serial ports
  serial.open(portName);              // open a serial port
}

//Draw Function -----------------------
function draw() {
 background(0); // black background
}

  //Guide 1:
  //A0 ~ [0]: Horiz (x) ~ orange
  //A1 ~ [1]: Verti (y) ~ yellow
  //D2 ~ [6]: 
  //D3 ~ [7]: Small Center Button (Pause) ~ purple
  //D4 ~ [8]: 
  //D5 ~ [9]: 

  //Guide 2:
  //A3 ~ [3]: Horiz (x) ~ orange
  //A4 ~ [4]: Verti (y) ~ yellow
  //D7 ~ [11]: 
  //D8 ~ [12]: Small Center Button (Pause) ~ purple
  //D9 ~ [13]: 
  //D10 ~ [14]: 



//Interpret serial data here ----------
function serialEvent() {
  // read a string from the serial port
  // until you get carriage return and newline:
  var inString = serial.readStringUntil('\r\n');
  //check to see that there's actually a ssetring there:
  if (inString.length > 0) {
    if (inString !== 'hello') {           // if you get hello, ignore it
      var sensors = split(inString, ','); // split the string on the commas
      if (sensors.length > 16) {           // if there are sixteen elements (6 analog, 10 digital)
      //Use sensor data here:

      //Player 1
        x1 = map(sensors[0], 0, 1024, 0, width);
        y1 = map(sensors[1], 0, 1024, 0, height);

      //Player 2
        x2 = map(sensors[3], 0, 1024, 0, width);
        y2 = map(sensors[4], 0, 1024, 0, height);

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