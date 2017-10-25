//controller 1
const int dig2 = 2; //blue
const int dig3 = 3; //purple
const int dig4 = 4; //grey
const int dig5 = 5; //white
const int dig6 = 6; //black
//controller 2
const int dig7 = 7; //blue
const int dig8 = 8; //purple
const int dig9 = 9; //grey
const int dig10 = 10; //white
const int dig11 = 11; //black

void setup() {
  Serial.begin(9600);
  while (Serial.available() <= 0) {
    Serial.println("hello"); // send a starting message
    delay(300);              // wait 1/3 second
  }
  pinMode(dig2, INPUT_PULLUP);
  pinMode(dig3, INPUT_PULLUP);
  pinMode(dig4, INPUT_PULLUP);
  pinMode(dig5, INPUT_PULLUP);
  pinMode(dig6, INPUT_PULLUP);
  pinMode(dig7, INPUT_PULLUP);
  pinMode(dig8, INPUT_PULLUP);
  pinMode(dig9, INPUT_PULLUP);
  pinMode(dig10, INPUT_PULLUP);
  pinMode(dig11, INPUT_PULLUP);
  
}

void loop() {
    if (Serial.available() > 0) {
      // read the incoming byte:
      int inByte = Serial.read();
      
      // read the sensor:

        //ANALOG Controller 1
      int analog0 = analogRead(A0);
      int analog1 = analogRead(A1);
      int analog2 = analogRead(A2);
        //ANALOG Controller 2
      int analog3 = analogRead(A3);
      int analog4 = analogRead(A4);
      int analog5 = analogRead(A5);
        //DIGITAL Controller 1
      int digital2 = digitalRead(dig2);
      int digital3 = digitalRead(dig3);
      int digital4 = digitalRead(dig4);
      int digital5 = digitalRead(dig5);
      int digital6 = digitalRead(dig6);
        //DIGITAL Controller 2
      int digital2 = digitalRead(dig7);
      int digital3 = digitalRead(dig8);
      int digital4 = digitalRead(dig9);
      int digital5 = digitalRead(dig10);
      int digital6 = digitalRead(dig11);
      
      // print the results:
      Serial.print(analog0);
        Serial.print(",");
      Serial.print(analog1);
        Serial.print(",");
      Serial.print(analog2);
        Serial.print(",");
      Serial.print(analog3);
        Serial.print(",");
      Serial.print(analog4);
        Serial.print(",");
      Serial.print(analog5);
        Serial.print(",");
  
      Serial.print(digital2);
        Serial.print(",");
      Serial.print(digital3);
        Serial.print(",");
      Serial.print(digital4);
        Serial.print(",");
      Serial.print(digital5);
        Serial.print(",");
      Serial.print(digital6);
        Serial.print(",");
      Serial.print(digital7);
        Serial.print(",");
      Serial.print(digital8);
        Serial.print(",");
      Serial.print(digital9);
        Serial.print(",");
      Serial.print(digital10);
        Serial.print(",");
      Serial.println(digital11);
  }
}
