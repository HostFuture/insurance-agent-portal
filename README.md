# Insurance Agent Portal
In the modern age of automation and digitalization, the client wants to create a web application for Insurance Agents who should be able to view the policies on UI.

## Index

* [Prerequisits](#prerequisits)
* [Installation](#installation)
* [Demo Preview](#demo-preview)
* [Running the Code](#running-the-code)
  * [Important Links](#important-links)


## Prerequisits

To initialize with this project the following software packages should be installed in the host machine
* Python v3.10.4
* Node JS v16.15.0
* npm v8.5.5

## Installation

To install the ReactJS Application, download the zip of this repository or clone it to your system and go to the **client** directory and run the following command to install all the dependancies of this project.

```npm install```

To setup the Flask Application, go to **server** directory and with the help of [requirement.txt](/server/requirement.txt) file install all the dependancies. It is recommended to setup a virtual environment for the flast application before installing requirement.txt

```pip install -r requirement.txt```

## Demo Preview

![Login](/screenshots/login.png)

## Running the Code

Once the prerequisits are met and the environment is setup you can run the following commands. By default Flask application runs at port 5000 and reactjs in post 3000, if you have to modify it, you can do it in the code and also please note that if the default port is changed for Flask, please update the changed port to [package.json](/annotation/package.json) under **proxy** configuration.

### Start the application

First you have to start the backend application (Flask) before starting ReactJS. To start the application go to **server** directory and run.

```
flask run
```

Once the backend code is up, then execute the following command to start the front end code from the **client** directory.

```
npm run start
```

### Important Links

* **Login Link**: http://localhost:3000/login
* **Registration Link**: http://localhost:3000/register
* **Dashboard Link**: http://localhost:3000/app
