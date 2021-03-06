// This #include statement was automatically added by the Particle IDE.
#include "DHT.h"

// This #include statement was automatically added by the Particle IDE.
#include "Adafruit_Sensor.h"
#include "Arduino.h"

// DHT Temperature & Humidity Sensor
// Adapted from the Unified Sensor Library Example by Tony DiCola for Adafruit Industries
// Released under an MIT license.

// REQUIRES the following Arduino libraries:
// - DHT Sensor Library: https://github.com/adafruit/DHT-sensor-library
// - Adafruit Unified Sensor Lib: https://github.com/adafruit/Adafruit_Sensor

// See guide for details on sensor wiring and usage:
//   https://learn.adafruit.com/dht/overview

// #include "Adafruit_Sensor.h"
// #include "DHT.h"
// #include "DHT_U.h"

#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>

// Create the DHT22 temperature sensor object
#define DHTPIN 2 // Digital pin number connected to the DHT sensor
#define DHTTYPE DHT22 // The sensor model (might also be DHT11 or DHT21)
DHT_Unified dht(DHTPIN, DHTTYPE);

// Define a global variable to store temperature readings
double temperature;

void setup(){
  // initialize hardware (and give it a minute to power up)
  dht.begin();
  delay(500);

  // bind the temperature global to a Particle variable
  Particle.variable("tempsensor", &temperature, DOUBLE);
}

void loop(){
  // local variable for reading from the sensor
  sensors_event_t event;

  // get the next temperature measurement
  dht.temperature().getEvent(&event);
  if (!isnan(event.temperature)) {
    // convert from celsius to fahrenheit
    double c = event.temperature;
    double f = (c * 9 / 5) + 32;

    // store the current temp in our global variable
    temperature = f;
  }

  // get the next humidity measurement
  dht.humidity().getEvent(&event);
  if (!isnan(event.relative_humidity)) {
    // optionally do something with event.relative_humidity...
  }

  // pause before taking the next reading
  delay(500);
}

// PUBLISH FUNCTION
// unsigned long lastTime = 0UL;
// char publishString[64];

// void setup() {
// }

// void loop() {
//     unsigned long now = millis();
//     //Every 15 seconds publish uptime
//     if (now-lastTime>15000UL) {
//         lastTime = now;
//         // now is in milliseconds
//         unsigned nowSec = now/1000UL;
//         unsigned sec = nowSec%60;
//         unsigned min = (nowSec%3600)/60;
//         unsigned hours = (nowSec%86400)/3600;

//         sprintf(publishString,"{\"Hours\": %u, \"Minutes\": %u, \"Seconds\": %u}",hours,min,sec);
//         Spark.publish("Uptime",publishString);
//     }
