# Lab Assistant IO

## Project Purpose
<img src="documentation/sparc_logo.png" height = "96" width = "267" alt="Project Diagram"></img>

The purpose of this project is to create a virtual assistant to assist SPARC members using Node.JS.  SPARC stands for [Student Projects and Research Committee]("http://sparc-auburn.github.io/") and is a student led organization in the Department of Electrical Engineering at Auburn University.  The virtual assistant will be fully featured including abilities to help in the lab to automating a home. It will include a system that allows for easy to use management of lab equipment and various administrative features.  The virtual assistant could also be integrated on a mobile robotic platform to allow more capabilities that a static computing platform could.  Our current iteration of the virtual assistant is named Karen.

## Project Overview

This project is programmed in Node.JS.  Node.JS provides a powerful yet fast back end to run the assistant. This project was originally developed in Python and is being transitioned into Node.JS to decrease response time and utilize the networking advantages of Node.JS.  To see the original project visit [SPARC-Auburn/Lab-Assistant](https://github.com/SPARC-Auburn/Lab-Assistant).

### Packages

The assistant interacted with through a main server set up on the desired device.  Packages are used to manage the intelligence of the assistant and can be turned on and off to allow flexibility.  User commands are passed in from the main server into the enabled packages.  The packages return a response back to the main server on what to   The packages communicate with a natural language processor named DialogFlow.

* Default - A collection of basic responses.
* Lab - A collection of responses and functions pertaining to assisting users in the SPARC lab.
* Home - A collection of responses and functions pertaining to home automation and light control.
* Weather - A collection of responses and functions pertaining to processing weather commands.
* Personal - A collection of functions pertaining to personal commands like reminders, time, and alarms.
* Knowledge - A collection of functions to search Google, Bing, Wolfram Alpha, Wikipedia, or etc.
* Fallback - A collection of fallback responses if previous suites did not catch.

### DialogFlow

<img src="documentation/dialogflow_logo.png" height = "106" width = "400" alt="Project Diagram"></img>

To help give the virtual assistant the ability to understand the English language, we are using a Google owned service called DialogFlow.  It is a natural language processor in which it deconstructs user inputs into intents (meaning) and entities (specifics).  Through customization and training, a machine learning algorithm can be tuned to allow the assistant to more intelligently communicate.

The DialogFlow documentation walks through an example of how it works: [https://dialogflow.com/docs/getting-started/basics](https://dialogflow.com/docs/getting-started/basics)

### Client Servers

To interact with various devices across a network, client servers can be setup.

* Windows Server - Interacts with Windows applications, control mouse and keyboard, etc.
* Robot Server - Interacts with robotic platforms.
* Home Server - Interacts with various IOT devices and microcontrollers for the purposes of home automation.
* Lab Server - Interacts with various IOT devices and microcontrollers for the purposes of lab automation.
* Slack Server - Interacts with Slack message groups.

## Running the Assistant

### Windows
1. Ensure the following are installed:
    * [Google Chrome](https://www.google.com/chrome/)
    * [Node.JS](https://nodejs.org/en/)
    * Git Manager like one of the following:
        * [Git Bash](https://git-for-windows.github.io/)
        * [Git Kraken](https://www.gitkraken.com/)
        * [Source Tree](https://www.sourcetreeapp.com/)
1. Clone directory [https://github.com/SPARC-Auburn/Lab-Assistant-IO](https://github.com/SPARC-Auburn/Lab-Assistant-IO) into desired location.
1. Open command prompt and change directories into `Lab-Assistant-IO/main_server`
1. Setup the node module by running `npm install`.
1. Start an instance of the main server by running `npm start`.
1. Open up Google Chrome and navigate to [https://localhost:8443/](https://localhost:8443/)
1. You should now see a website displayed that you can interact with the assistant.
1. If you need to stop the program use "CTRL-SHIFT-C".

### Mac OSX

### Debian Linux (Ubuntu, Raspbian, etc.)

## Contributing to the Project

Please see the [CONTRIBUTING.md](CONTRIBUTING.md) document in this repository for recommendations on how to contribute.
