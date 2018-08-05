import React, { Component } from 'react';

import './App.css'

const liff = window.liff;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayName : '',
      userId : '',
      pictureUrl : '',
      statusMessage : ''
    };

    this.initialize = this.initialize.bind(this);
    this.closeApp = this.closeApp.bind(this);
  }

  componentDidMount() {
    window.addEventListener('load', this.initialize);
  }

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

  closeApp(event) {
    event.preventDefault();
    liff.sendMessages([{
      type: 'text',
      text: "Bye Bye!!!"
    }]).then(() => {
      liff.closeWindow();
    });
  }

  render() {
    return (
      <div className="container">
        <div className="columns m-t-10">
          <div className="column col-xs-12">
            <div className="panel">
              <div className="panel-header text-center">
                <figure className="avatar avatar-lg">
                  <img src={this.state.pictureUrl} alt="Avatar" />
                </figure>
                <div className="panel-title h5 mt-10">{this.state.displayName}</div>
                <div className="panel-subtitle">{this.state.statusMessage}</div>
              </div>
              <div className="panel-footer">
                <button className="btn btn-primary btn-block" onClick={this.closeApp}>Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
