#WATER TANK MANAGEMENT SYSTEM#
<p>
A DIY project using the STM32F401CCU6 microcontroller designed to manage a water tank's water level efficiently. This system monitors water levels and controls a pump to ensure appropriate water levels while providing real-time feedback via LEDs.

## Features
- Monitors water levels using an ultrasonic sensor (HC-SR04).
- Controls a mini SP pump via a relay module to maintain desired water levels.
- Displays water levels using LEDs.
- Provides wireless control/monitoring capabilities through a Bluetooth module (HC-05).
- Protects the system from back current using a diode.
  
## Components Used
- **Microcontroller**: STM32F401CCU6
- **Bluetooth Module**: HC-05
- **Ultrasonic Sensor**: HC-SR04
- **Relay Module**: 1 Channel (5V)
- **Mini SP Pump**
- **Power Supply**: 9V Battery
- **Diode**: To prevent back current when the relay is off
- **LEDs**: Indicate water level
- **Resistors**: For LED connections and circuit stability
- **Breadboard**: For prototyping
- **Dispaly via mobile app** : For water level dislay and controlling the pump

## Circuit Description
1. The **ultrasonic sensor (HC-SR04)** measures the water level by calculating the time taken for sound waves to reflect back from the water surface.
2. Based on the water level, **LEDs** indicate the current water status using 5 LEDs(2 yellow LEDs for low levels , 2 green LEDs for medium levels , 1 red LED for the top level)
3. The **relay module** acts as a switch to control the **mini SP pump**, isolating the pump's high-power circuit from the STM32 board.
4. A **diode** is placed across the relay to block back current and protect the microcontroller.
5. The **Bluetooth module (HC-05)** allows wireless monitoring and control of the water pump.
6. The circuit is powered using a **9V battery** for portability.

## Software Implementation
The project is programmed using Keil Vision u5 IDE. The code includes:
- GPIO configuration for LEDs, relay control, and ultrasonic sensor trigger/echo pins(Using Interrupts).
- UART configuration for Bluetooth communication.

## Project Workflow
1. Power on the system using the 9V battery.
2. The ultrasonic sensor continuously measures water levels.
3. LEDs indicate the current water status in real-time.
4. If the water level flows above  a predefined threshold, the red LED starts blinking and the an alert message("STOP") is deliverd to the mobile app
5. The pump turns off when the water level reaches the desired level.
7. Users can monitor or control the system via the Bluetooth module.

## How to Use
1. Upload the code to the STM32F401CCU6 using the Keil Vision u5 IDE.
2. Assemble the circuit as described in the schematics provided.
3. Power the system and monitor the water levels via the LEDs or Bluetooth module.
</p>
