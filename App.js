import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import {Router, Scene} from 'react-native-router-flux';
import Authentication from "./Authentication"
import HomePage from './HomePage'

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
              hideNavBar={this.state.hasToken}
              key='HomePage'
              title='Home Page'
            />
          </Scene>
        </Router>
      )
    }
  }
}


export default App

