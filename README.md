# fhnw iot project - lossprevention
### Philipp Alder & Alejandro Garcia

## Device Code

## WebApp

#### Beschreibung & Funktion
asdasdasd
asd
asd
asd
as
da
sdas

#### Project setup
```
yarn install
```

go to main.js and add your Google API Key

##### Compiles and hot-reloads for development
```
yarn serve
```

##### Compiles and minifies for production
```
npm run build
```


# IoT Engineering Example Project

## Project

A bicycle alarm system and tracker utilizing The Things Network's LoRaWAN infrastructure.

## Introduction

### Team members

@palder

@dev-ale

## Deliverables

### Source code

#### Tracking Device

##### Source code

* [Feather nRF52840 Express Source Code](https://github.com/dev-ale/fhnw-iot-lossprevention/tree/master/arduino-code)

Credits: The source code has been compiled from pre-existing source code

GIVE CREDIT HERE 



##### Software setup

You'll have to replace the `NWKSKEY[16]`, `APPSKEY[16]` and `DEVADDR` values in the nRF52840 source code  with values from the console on  [The Things Network](https://www.thethingsnetwork.org/)  (see below). 

```c++
static const u1_t PROGMEM NWKSKEY[16] = { 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 };
static const u1_t PROGMEM APPSKEY[16] = { 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 };
static const u4_t DEVADDR = 0x00000000;
```



##### Setup hardware

The following hardware is required for this project:

* Feather nRF52840 Express 
* u-blox PAM-7Q GPS 
* CABLES?
* Optional but recommended: Grove Shield for Feather
* Optional but recommended: Breadboard

##### Enclosure

This is a proof of concept and does not come with an enclosure. Depending on the availability of a power source and environment that the tracker is used, a suitable enclosure may vary.


#### Node.js Web Application

##### Source code

* [Node.js Backend Source Code](https://github.com/dev-ale/fhnw-iot-lossprevention/tree/master/src)


##### Setup software


##### Setup hardware


#### 

#### The Things Network

* Create a free [The Things Network](https://www.thethingsnetwork.org/) account and setup an app.

* Setup an Application that uses `ABP` authentication and get the `Network Session Key`, `App Session Key` and `Device Address` for replacing values in the  nRF52840 source code.

* In the The Things Network Console configure the following *Payload Format decoder*:

  ```
  function Decoder(b, port) {
  
    var lat = (b[0] | b[1]<<8 | b[2]<<16 | (b[2] & 0x80 ? 0xFF<<24 : 0)) / 10000;
    var lng = (b[3] | b[4]<<8 | b[5]<<16 | (b[5] & 0x80 ? 0xFF<<24 : 0)) / 10000;
  
    return {
      location: {
        lat: lat,
        lng: lng
      }
    };
  }
  ```

  Credit: This decoder is from https://www.thethingsnetwork.org/forum/t/best-practices-when-sending-gps-location-data-howto/1242/21




#### TTN to ThingSpeak adapter


##### Source code


##### Setup


### Presentation


#### Use cases


#### Reference model


#### Interface documentation


#### Issues


### Live demo

