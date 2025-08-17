#include<String.h>
#include <Servo.h>
#include <Stepper.h>
int val = 0, lock = 0, lock1 = 0, lock2 = 0, i = 0, pos = 0;
const int sw1 = 13;
const int sw2 = A0;
Servo servo1;
#define servoPin 6
char ser[20];
const int stepsPerRevolution1 = 500;
const int stepsPerRevolution2 = 500;
Stepper myStepper1 = Stepper(stepsPerRevolution1, 8, 9, 10, 11);
Stepper myStepper2 = Stepper(stepsPerRevolution2, 2, 3, 4, 5);
void setup()
{
  Serial.begin (9600);
  pinMode(sw1, INPUT_PULLUP);
  pinMode(sw2, INPUT_PULLUP);
  servo1.attach(servoPin);
  servo1.write(5);
  myStepper1.setSpeed(40);
  myStepper2.setSpeed(60);
  Serial.println("ok");
  delay(500);
}
void Tag_match()
{
  if (strcmp (ser, "4C003BDB8A26") == 0)
  {
    Serial.println("First Tag...");
    lock = 1;
  }
  else if (strcmp (ser, "4C00389D7C95") == 0)
  {
    Serial.println("Second Tag...");
    lock = 2;
  }
  else if (strcmp (ser, "4C003BD470D3") == 0)
  {
    Serial.println("Third Tag...");
    lock = 3;
  }
  else if (strcmp (ser, "4C003BD89A35") == 0)
  {
    Serial.println("Four Tag...");
    lock = 4;
  }
}
void motor()
{
  servo1.write(90); delay(1000);
  servo1.write(5); delay(1000);
}
void loop()
{

  if (lock == 1)//X =0,Y = 0
  {
    for (i = 0; i < 5; i++)
    {
      myStepper1.step(150);
      if (digitalRead(sw1) == 0)
      {
        myStepper1.step(-40);
        lock = 0; delay(1000);
        i = 10;
        digitalWrite(8, LOW); digitalWrite(9, LOW); digitalWrite(10, LOW); digitalWrite(11, LOW); delay(200);
      }
    }
    delay(1000);
    for (i = 0; i < 5; i++)
    {
      myStepper2.step(150);
      if (digitalRead(sw2) == 0)
      {
        myStepper2.step(-200);
        lock = 0; delay(100);
        i = 10;
        digitalWrite(2, LOW); digitalWrite(3, LOW); digitalWrite(4, LOW); digitalWrite(5, LOW); delay(200);
      }
    }
    delay(1000);
    motor();
  }

  if (lock == 2)//X = 1,Y = 0
  {
    for (i = 0; i < 7; i++)
    {
      myStepper1.step(200);
      if (digitalRead(sw1) == 0)
      {
        for (i = 0; i < 2; i++)
        {
          myStepper1.step(-200);
          delay(500);
        }
        digitalWrite(8, LOW); digitalWrite(9, LOW); digitalWrite(10, LOW); digitalWrite(11, LOW); delay(200);
        lock = 0; i = 10;
      }
    }
    delay(1000);
    for (i = 0; i < 7; i++)
    {
      myStepper2.step(200);
      if (digitalRead(sw2) == 0)
      {
        myStepper2.step(-200);
        lock = 0; delay(500);
        i = 10;
        digitalWrite(2, LOW); digitalWrite(3, LOW); digitalWrite(4, LOW); digitalWrite(5, LOW); delay(200);
      }
    }
    delay(1000);
    motor();
  }

  if (lock == 3)//X = 0,Y = 1
  {
    for (i = 0; i < 5; i++)
    {
      myStepper1.step(150);
      if (digitalRead(sw1) == 0)
      {
        myStepper1.step(-40);
        lock = 0; delay(1000);
        i = 10;
        digitalWrite(8, LOW); digitalWrite(9, LOW); digitalWrite(10, LOW); digitalWrite(11, LOW); delay(200);
      }
    }
    delay(1000);
    for (i = 0; i < 5; i++)
    {
      myStepper2.step(150);
      if (digitalRead(sw2) == 0)
      {
        for (i = 0; i < 2; i++)
        {
          myStepper2.step(-200);
          delay(500);
        }
        digitalWrite(2, LOW); digitalWrite(3, LOW); digitalWrite(4, LOW); digitalWrite(5, LOW); delay(200);
        lock = 0; i = 10;
      }
    }
    delay(1000);
    motor();
  }

  if (lock == 4)
  {
    for (i = 0; i < 7; i++)
    {
      myStepper1.step(200);
      if (digitalRead(sw1) == 0)
      {
        for (i = 0; i < 2; i++)
        {
          myStepper1.step(-200);
          delay(500);
        }
        digitalWrite(8, LOW); digitalWrite(9, LOW); digitalWrite(10, LOW); digitalWrite(11, LOW); delay(200);
        lock = 0; i = 10;
      }
    }
    delay(1000);
    for (i = 0; i < 7; i++)
    {
      myStepper2.step(200);
      if (digitalRead(sw2) == 0)
      {
        for (i = 0; i < 2; i++)
        {
          myStepper2.step(-200);
          delay(500);
        }
        digitalWrite(2, LOW); digitalWrite(3, LOW); digitalWrite(4, LOW); digitalWrite(5, LOW); delay(200);
        lock = 0; i = 10;
      }
    }
    delay(1000);
    motor();
  }

  if (Serial.available() > 0)
  {
    ser[val] = Serial.read();
    val++;
    if (val > 11)
    {
      val = 0;
      Tag_match();
      Serial.println('.');
    }
  }
}