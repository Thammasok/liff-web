## How to use LIFF SDK on ReactJS
You can learn more about LIFF SDK from Line Developers [LIFF SDK](https://developers.line.me/en/reference/liff)

### Table of Contents
- [Getting started with LIFF](#getting-started-with-liff)
- [Develop your LIFF app on ReactJS](#develop-your-liff-app-on-reactjs)
- [Run This Project](#run-this-project)

---
### Getting started with LIFF
To add your web app to LIFF and enable the use of the LIFF, follow the steps below.

1. Create a channel for your LIFF app on the console.
2. Develop your LIFF app.
3. Add your app to LIFF

> In this project is step `2. Develop your LIFF app on ReactJS`

---
### Develop your LIFF app on ReactJS

##### 1. Import LIFF SDK in file `public/index.html`
```
<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <meta name="theme-color" content="#000000">
      
      <title>EZE LIFF</title>
      
      <link rel="manifest" href="%PUBLIC_URL%/manifest.json">
      <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
      <link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre.min.css">
      
      <script src="https://d.line-scdn.net/liff/1.0/sdk.js"></script> <---- add script here
    </head>
```

##### 2. We will initialize our LIFF in `App.js` when load the component so that we can call other methods.

```
import React, { Component } from 'react';
import './App.css';

const liff = window.liff;  

class App extends Component {

  constructor(props) {
    super(props);
    
    this.initialize = this.initialize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('load', this.initialize);
  }

  initialize() {
    liff.init((data) => {
      //code
    });
  }
```

##### 3. Show User’s profile information when open app on LIFF

* Get Profile
```
initialize() {
  liff.init(async (data) => {
    let profile = await liff.getProfile();
    this.setState({
      displayName : profile.displayName,
      userId : profile.userId,
      pictureUrl : profile.pictureUrl,
      statusMessage : profile.statusMessage
    });
  }); 
}
```
* Set state on `constructor()`
```
constructor(props) {
  ...
  
  this.state = {
    displayName : '',
    userId : '',
    pictureUrl : '',
    statusMessage : ''
  };
}
```

##### 4. Create close button

* Create Close Function by will send message to chat room and close LIFF
```
closeApp(event) {
  event.preventDefault();
  liff.sendMessages([{
    type: 'text',
    text: "Bye Bye!!!"
  }]).then(() => {
    liff.closeWindow();
  });
}
```
* Add closeApp Function in `constructor()`
```
constructor(props) {
  ...
  this.closeApp = this.closeApp.bind(this);
}
```

---
### Run This Project

##### 1. Clone this project
```
git clone https://github.com/Thammasok/liff-web.git
```

##### 2. Install Project
```
cd liff-web
npm install or yarn install
```

##### 3. Run Project
* Run project on local
```
npm run start
```
* Build project
```
npm run build
```
* Run project on Production (By use ExpressJS)
```
npm run start:service
```

---

## Have FUN with your idea!