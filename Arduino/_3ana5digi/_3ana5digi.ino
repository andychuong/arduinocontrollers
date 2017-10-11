const int dig2 = 2;
const int dig3 = 3;
const int dig4 = 4;
const int dig5 = 5;
const int dig6 = 6;
const int dig7 = 7;

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
  
}

void loop() {
    if (Serial.available() > 0) {
      // read the incoming byte:
      int inByte = Serial.read();
      
      // read the sensor:

        //ANALOG
      int analog0 = analogRead(A0);
      int analog1 = analogRead(A1);
      int analog2 = analogRead(A2);
        //DIGITAL
      int digital2 = digitalRead(dig2);
      int digital3 = digitalRead(dig3);
      int digital4 = digitalRead(dig4);
      int digital5 = digitalRead(dig5);
      int digital6 = digitalRead(dig6);
      int digital7 = digitalRead(dig7);
      
      // print the results:
      Serial.print(analog0);
        Serial.print(",");
      Serial.print(analog1);
        Serial.print(",");
      Serial.print(analog2);
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
      Serial.println(digital7);
 
  }
}
