import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage } from 'react-native';
import {Router, Scene} from 'react-native-router-flux';
import Authentication from "./Authentication"
import HomePage from './HomePage'
import Details from './Details'

class App extends Component {

  constructor() {
    super();
    this.state = { 
      hasToken: false,
      isLoaded: false };
  }

  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      this.setState({ 
        hasToken: token !== null, 
        isLoaded: true 
      })
    });
  }

  render() {

    if (!this.state.isLoaded) {
      return (
        <ActivityIndicator />
      )
    }else{
      return(
        <Router>
          <Scene key='root'>
            <Scene
              component={Authentication}
              hideNavBar={true}
              initial={!this.state.hasToken}
              key='Authentication'
              title='Authentication'
            />
            <Scene
              component={HomePage}
              hideNavBar={true}
              key='HomePage'
              title='Home Page'
            />
            <Scene
              component={Details}
              key='Details'
              title='Details'
            />
          </Scene>
        </Router>
      )
    }
  }
}


export default App

