# Week 8: Programming Hardware

## Assignment Notes 

While these resources are largely easy to use, I found the UI and application development on the device to be complicated and ended up hitting road blocks with the starter code. I've been using the following resources to manage my device with terminal, update hardware, and troubleshoot the temp-sensor application:

- https://docs.particle.io/tutorials/device-os/led/photon/
- https://docs.particle.io/reference/developer-tools/cli/


***
## Initial setup

### Device setup
Device setup was easy enough in that I was able to get the device online and operating with test applications including *Blinking an LED* and *Publish*. I'm using both the web app and the mobile application to manage my device.
![Blink LED test](images/blinkLED.png "Blink LED test")

Publishing event data from PUBLISH test app:

```
  Flash successful! Your device is being updated..Last Event: flash/status = success iceicebb  v1.5.2 
  Ready.Last Event: particle/device/updates/pending = false iceicebb  v1.5.2` 

  intact

    {"device":{"network":{"signal":{"at":"Wi-Fi","strength":100,"strength_units":"%","strengthv":-22,"strengthv_units":"dBm","strengthv_type":"RSSI","quality":100,"quality_units":"%","qualityv":70,"qualityv_units":"dB","qualityv_type":"SNR"},"connection":{"status":"connected","error":0,"disconnects":0,"attempts":1,"disconnect_reason":"none"}},"cloud":{"connection":{"status":"connected","error":0,"attempts":1,"disconnects":0,"disconnect_reason":"none"},"coap":{"transmit":0,"retransmit":0,"unack":0,"round_trip":0},"publish":{"rate_limited":0}},"system":{"uptime":11,"memory":{"used":36816,"total":82944}}},"service":{"device":{"status":"ok"},"cloud":{"uptime":7,"publish":{"sent":2}},"coap":{"round_trip":1172}}}
```

***
## Starter Code

### Test code user errors
I originally copied the starter code and ran into some easy-to-fix errors from my copying, which was good practice for naivating the particle Web IDE. I simply removed the additional code and cleared these errors:
![Copied code errors](images/copied-code.png "Copied code errors")

### ino file includes
In running through the initial files, I was thrown an error that some of thelibrary dependencies weren't included and Particle asked if I wanted to compile without them. It was easy enough to remedy by adding the library files to my ino file, I opted to reference them locally using *#include "filename.h* but also successfully tested referencing them differently using *#include <filename.h>*:

    #include "Adafruit_Sensor.h"
    #include "DHT.h"
    #include "DHT_U.h"

    // #include <Adafruit_Sensor.h>
    // #include <DHT.h>
    // #include <DHT_U.h>

### Arduino errors 
I also found errors in the "Adafruit_sensor.cpp" file, specifically that _Serial_ and _F_ were not defined. 
![Arduino errors](images/arduino-defs2.png "Arduino errors")

I tried referencing my ino file to see if this remedied a global variable issue, but was told this referenced loops twice. I also tried referencing Adafruit_sensor.h differently (#include <Adafruit_sensor.h), to no avail, and my other libraries DHT and Unified DHT. I found that by referencing the DHT libraries, Serial and F were defined because they are Arduino variables and the DHT files include Arduino.h, so if I used either of those it would call the correct function:

    #include "DHT.h"
    #include "Arduino.h"
    // #include "DHT_U.h"
    // #include <Adafruit_Sensor.h>
    // #include "snek.ino"

### Combining ino files
I read through the *publish* and *publishingJSON* tutorials to look at the differences between the PUBLISH test app and the data that we would need. I originally tried creating a new ino file in the Web IDE, but was having trouble with the UI. I added the publish function from the tutorial to my main ino file and found errors in the functions calling twice.
![Combining ino files](images/combine_Ino-files.png "ino errors")

I eventually combined and commented out the Publish functions in my main ino file to work with offline.  


***
## Flashing the device

### Compiling the code
When I was able to run the starter code, my particle device was initially "breathing cyan" and was able to be read online by my particle console. After flashing my app onto my device, the device went offline and was unable to be pinged.

I was able to reset it and get it to ping again, but upon flashing the app I found the device would freeze up and utrn a "solid cyan". After flashing the app, the connection would ping only sometimes and freeze. I eventually attempted to reset the wifi connection entirely by "forgetting" the app in my console.
![Device offline](images/troubleshooting_offline.png "Offline")

### Reclaiming the device
Forgetting the device made it impossible to troubleshoot either via console or terminal. I was also unable to get the device management wifi to return to add the wifi credentials again. I put the device in DFU mode using *particle usb dfu*, updated the firmware and then used *particle add [device number]* via to re-add the device:

    Error writing firmware: No DFU device found
    (base) Sheas-MBP:~ smolloy$ particle usb dfu
    TimeoutError [VError]
        at RequestSender.delay (/Users/smolloy/.particle/node_modules/particle-cli/node_modules/particle-usb/lib/device.js:106:13)
        at /Users/smolloy/.particle/node_modules/particle-cli/node_modules/particle-usb/lib/device.js:212:17
        at async Promise.all (index 0)
        at async CLI.runCommand (/Users/smolloy/.particle/node_modules/particle-cli/dist/app/cli.js:160:7)
        at async CLI.run (/Users/smolloy/.particle/node_modules/particle-cli/dist/app/cli.js:190:14) {
      jse_shortmsg: '',
      jse_info: {},
      message: ''
    }

    (base) Sheas-MBP:~ smolloy$ particle flash --usb tinker

    Flash success!
    (base) Sheas-MBP:~ smolloy$ particle device add 1f0026000447393035313138
    Claiming device 1f0026000447393035313138
    Successfully claimed device 1f0026000447393035313138

### Troubleshooting the device
I found a great resouce on the LED animation and what it means when troubleshooting the Proton device from Particle: https://docs.particle.io/tutorials/device-os/led/photon/ From here, I learned that solid colors indicate an issue in the code itself, and the fact the LED is now a solid cyan means that it was last online and froze in the compiling.
![Solid cyan LED animation](images/solid_colors.png "Solid cyan")

### Updating firmware
I have since flashed my starter code several times and found it freezes the device each time. Updating the firmware in terminal using *particle usb dfu* does allow the device to unfreeze every time so far.

### Safemode
I am now troubleshooting in safemode, trying to identify the infinite loop or parsing issues in my app *snek*. Safe mode puts the device offline as you troubleshoot firmware as per these instructions: https://docs.particle.io/reference/developer-tools/cli/ 

***
## Assignment Output

## Working device
The device is working and I am currently troubleshooting the starter code in safe mode to prevent future crashes.

## Sketches
I'm planning on using the temperature sensor to monitor the environment for my pet snake, Plissken's tank. You can find the sketches for the UI as they exist pre-data pulling here: https://xd.adobe.com/view/3169d145-ee3a-450f-b004-839efbcf5e21-643a/

## Questions
- What are the main differences between _#include <filename>_ and _#include "filename"_?
- What about the app has been freezing my device?
- What does this data look like? _(TBD)_