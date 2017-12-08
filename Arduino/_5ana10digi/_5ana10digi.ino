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
  
  pinMode(dig2, INPUT);
  pinMode(dig3, INPUT);
  pinMode(dig4, INPUT);
  pinMode(dig5, INPUT);
  pinMode(dig6, INPUT);
  pinMode(dig7, INPUT);
  pinMode(dig8, INPUT);
  pinMode(dig9, INPUT);
  pinMode(dig10, INPUT);
  pinMode(dig11, INPUT);
  
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
      int digital7 = digitalRead(dig7);
      int digital8 = digitalRead(dig8);
      int digital9 = digitalRead(dig9);
      int digital10 = digitalRead(dig10);
      int digital11 = digitalRead(dig11);
      
//       print the results:
      Serial.print(analog0); //[0]
        Serial.print(",");
      Serial.print(analog1); //[1]
        Serial.print(",");
      Serial.print(analog2); //[2]
        Serial.print(",");
      Serial.print(analog3); //[3]
        Serial.print(",");
      Serial.print(analog4); //[4]
        Serial.print(",");
      Serial.print(analog5); //[5]
        Serial.print(",");
  
      Serial.print(digital2); //[6]
        Serial.print(",");
      Serial.print(digital3); //[7]
        Serial.print(",");
      Serial.print(digital4); //[8]
        Serial.print(",");
      Serial.print(digital5); //[9]
        Serial.print(",");
      Serial.print(digital6); //[10]
        Serial.print(",");
      Serial.print(digital7); //[11]
        Serial.print(",");
      Serial.print(digital8); //[12]
        Serial.print(",");
      Serial.print(digital9); //[13]
        Serial.print(",");
      Serial.println(digital10); //[14]
        Serial.print(",");
      Serial.println(digital11); //[15]
  }
}
