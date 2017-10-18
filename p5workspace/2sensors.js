var serial;          // variable to hold an instance of the serialport library
var portName = 'COM4';  // fill in your serial port name here
var locH = 50;
var locV = 50;      // location of the circle
var circleColor = 255; // color of the circle

function draw() {
 background(0);               // black background
 fill(circleColor);           // fill depends on the button
 ellipse(locH, locV, 50, 50); // draw the circle
}

 
function setup() {
  createCanvas(640, 480);
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);  // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
  serial.list();                      // list the serial ports
  serial.open(portName);              // open a serial port
}

function serialEvent() {
  // read a string from the serial port
  // until you get carriage return and newline:
  var inString = serial.readStringUntil('\r\n');
  //check to see that there's actually a ssetring there:
  if (inString.length > 0) {
    if (inString !== 'hello') {           // if you get hello, ignore it
      var sensors = split(inString, ','); // split the string on the commas
      if (sensors.length > 2) {           // if there are three elements
        locH = map(sensors[0], 0, 1024, 0, width); // element 0 is the locH
        console.log("H :" + locH);
        locV = map(sensors[1], 0, 1024, 0, height); // element 1 is the locV
        console.log("V :" + locV + ", " + sensors[1]);
        if(sensors[3] == 0){
          // circleColor = 100;
          serial.close(portName);
        }
        if(sensors[3] == 1){
          circleColor = 255;
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