// This #include statement was automatically added by the Particle IDE.
#include <Adafruit_DHT_Particle.h>

// troubleshooting conversions
// #include "Particle.h"
// #include "math.h"

//#define DHTPIN D3     // troubleshooting pins
#define DHTPIN D2     // troubleshooting pins
// #define DHTTYPE DHT11		// DHT 11 
#define DHTTYPE DHT22		// DHT 22 (AM2302)
// #define DHTTYPE DHT21		// DHT 21 (AM2301)

// Connect pin 1 (on the left) of the sensor to +5V
// Connect pin 2 of the sensor to whatever your DHTPIN is
// Connect pin 4 (on the right) of the sensor to GROUND
// Connect a 10K resistor from pin 2 (data) to pin 1 (power) of the sensor

double tempF = 0; 

DHT dht(DHTPIN, DHTTYPE);
int loopCount;

void setup() {
	Serial.begin(9600); 
	Serial.println("DHTxx test!");
	Particle.publish("state", "DHTxx test start");
	Particle.variable("temp", tempF); // REFERENCES GLOBAL VARIABLE tempF

	dht.begin();
	loopCount = 0;
	delay(2000);
}

void loop() {
// Wait a few seconds between measurements.
//	delay(2000);

// Reading temperature or humidity takes about 250 milliseconds!
// Sensor readings may also be up to 2 seconds 'old' (its a 
// very slow sensor)
	
// // 	ATTEMPTING TO CONVERT HUMIDITY
// 	float hC = dht.getHumidity();
// 	float h = convertCtoF(hC);
    
    float h = dht.getHumidity();

// Read temperature as Celsius
	float t = dht.getTempCelcius();
// Read temperature as Farenheit
	float f = dht.getTempFarenheit();
	
	tempF = f; 
  
// // Check if any reads failed and exit early (to try again).
// 	if (isnan(h) || isnan(t) || isnan(f)) {
// 		Serial.println("Failed to read from DHT sensor!");
// 		return;
// 	}

// Compute heat index
// Must send in temp in Fahrenheit!
	float hi = dht.getHeatIndex();
	float dp = dht.getDewPoint();
	float k = dht.getTempKelvin();

// 	Serial.print("Humid: "); 
// 	Serial.print(h);
// 	Serial.print("% - ");
// 	Serial.print("Temp: "); 
// 	Serial.print(t);
// 	Serial.print("*C ");
// 	Serial.print(f);
// 	Serial.print("*F ");
// 	Serial.print(k);
// 	Serial.print("*K - ");
// 	Serial.print("DewP: ");
// 	Serial.print(dp);
// 	Serial.print("*C - ");
// 	Serial.print("HeatI: ");
// 	Serial.print(hi);
// 	Serial.println("*F");
// 	Serial.println(Time.timeStr());
//	String timeStamp = Time.timeStr();
	Particle.publish("readings", String::format("{\"Hum(\%)\": %4.2f, \"Temp(°F)\": %4.2f, \"DP(°C)\": %4.2f, \"HI(°C)\": %4.2f}", h, f, dp, hi)); delay(10000);



// 	loopCount++;
// 	if(loopCount >= 6){
// 	  Particle.publish("state", "Going to sleep for 5 minutes");
// 	  delay(1000);
// 	  System.sleep(SLEEP_MODE_DEEP, 300);  
// 	}
}


////////// 
//SENSOR TROUBLESHOOTING
//////////

// // PietteTech troubleshooting
// #include "PietteTech_DHT/PietteTech_DHT.h"


// // system defines
// #define DHTTYPE  DHT22              // Sensor type DHT11/21/22/AM2301/AM2302
// #define DHTPIN   D2         	    // Digital pin for communications
// #define DHT_SAMPLE_INTERVAL   2000  // Sample every two seconds

// //declaration
// void dht_wrapper(); // must be declared before the lib initialization

// // Lib 
// PietteTech_DHT DHT(DHTPIN, DHTTYPE, dht_wrapper);

// // orginal declarations
// // DHT dht(DHTPIN, DHTTYPE);
// // int loopCount;

// // globals
// unsigned int DHTnextSampleTime;	    // Next time we want to start sample
// bool bDHTstarted;		    // flag to indicate we started acquisition
// int n;                              // counter

// void setup()
// {
//     Serial.begin(9600);
//     while (!Serial.available()) {
//         Serial.println("Press any key to start.");
//         delay (1000);
//     }
//     Serial.println("DHT Example program using DHT.acquire and DHT.aquiring");
//     Serial.print("LIB version: ");
//     Serial.println(DHTLIB_VERSION);
//     Serial.println("---------------");

//     DHTnextSampleTime = 0;  // Start the first sample immediately
// }


// // This wrapper is in charge of calling
// // mus be defined like this for the lib work
// void dht_wrapper() {
//     DHT.isrCallback();
// }

// void loop()
// {
//   // Check if we need to start the next sample
//   if (millis() > DHTnextSampleTime) {
// 	if (!bDHTstarted) {		// start the sample
// 	    Serial.print("\n");
// 	    Serial.print(n);
// 	    Serial.print(": Retrieving information from sensor: ");
// 	    DHT.acquire();
// 	    bDHTstarted = true;
// 	}

//     // Reading temperature or humidity takes about 250 milliseconds!
//     // Sensor readings may also be up to 2 seconds 'old' (its a 
//     // very slow sensor)
//     	float h = DHT.getHumidity();
//     // Read temperature as Celsius
//     	float t = DHT.getTempCelcius();
//     // Read temperature as Farenheit
//     	float f = DHT.getTempFarenheit();
    	
//     	tempF = f; 
      
//     // Check if any reads failed and exit early (to try again).
//     	if (isnan(h) || isnan(t) || isnan(f)) {
//     		Serial.println("Failed to read from DHT sensor!");
//     		return;
//     	}
    
//     // Compute heat index
//     // Must send in temp in Fahrenheit!
//     	float hi = PietteTech_DHT.getHeatIndex();
//     	float dp = PietteTech_DHT.getDewPoint();
//     	float k = PietteTech_DHT.getTempKelvin();
    	
    	
// 	if (!DHT.acquiring()) {		// has sample completed?

// 	    // get DHT status
// 	    int result = DHT.getStatus();

// 	    Serial.print("Read sensor: ");
// 	    switch (result) {
// 		case DHTLIB_OK:
// 		    Serial.println("OK");
// 		    break;
// 		case DHTLIB_ERROR_CHECKSUM:
// 		    Serial.println("Error\n\r\tChecksum error");
// 		    break;
// 		case DHTLIB_ERROR_ISR_TIMEOUT:
// 		    Serial.println("Error\n\r\tISR time out error");
// 		    break;
// 		case DHTLIB_ERROR_RESPONSE_TIMEOUT:
// 		    Serial.println("Error\n\r\tResponse time out error");
// 		    break;
// 		case DHTLIB_ERROR_DATA_TIMEOUT:
// 		    Serial.println("Error\n\r\tData time out error");
// 		    break;
// 		case DHTLIB_ERROR_ACQUIRING:
// 		    Serial.println("Error\n\r\tAcquiring");
// 		    break;
// 		case DHTLIB_ERROR_DELTA:
// 		    Serial.println("Error\n\r\tDelta time to small");
// 		    break;
// 		case DHTLIB_ERROR_NOTSTARTED:
// 		    Serial.println("Error\n\r\tNot started");
// 		    break;
// 		default:
// 		    Serial.println("Unknown error");
// 		    break;
// 	    }

// 	    Serial.print("Humidity (%): ");
// 	    Serial.println(DHT.getHumidity(), 2);

// 	    Serial.print("Temperature (oC): ");
// 	    Serial.println(DHT.getCelsius(), 2);

// 	    Serial.print("Temperature (oF): ");
// 	    Serial.println(DHT.getFahrenheit(), 2);

// 	    Serial.print("Temperature (K): ");
// 	    Serial.println(DHT.getKelvin(), 2);

// 	    Serial.print("Dew Point (oC): ");
// 	    Serial.println(DHT.getDewPoint());

// 	    Serial.print("Dew Point Slow (oC): ");
// 	    Serial.println(DHT.getDewPointSlow());

// 	    n++;  // increment counter
// 	    bDHTstarted = false;  // reset the sample flag so we can take another
// 	    DHTnextSampleTime = millis() + DHT_SAMPLE_INTERVAL;  // set the time for next sample
	    
//     	Particle.publish("readings", String::format("{\"Hum(\%)\": %4.2f, \"Temp(°F)\": %4.2f, \"DP(°C)\": %4.2f, \"HI(°F)\": %4.2f}", h, f, dp, hi));
// 	delay(10000);
// 	}
//     }
// }