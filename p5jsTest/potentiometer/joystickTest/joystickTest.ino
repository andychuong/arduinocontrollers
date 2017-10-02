void setup() {
 Serial.begin(9600); // initialize serial communications
}
 
void loop() {
 int horiz = analogRead(A0);// read the input pin
 int vert = analogRead(A1);
 int mappedH = map(horiz, 0, 1023, 0, 255); // remap the pot value to fit in 1 byte
 int mappedV = map(vert, 0, 1023, 0, 255);
 Serial.write(mappedH + mappedV);                             // print it out the serial port
 delay(1);                                            // slight delay to stabilize the ADC
}
