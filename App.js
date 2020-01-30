import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage } from 'react-native';
import {Router, Scene} from 'react-native-router-flux';
import Authentication from "./Authentication"
import HomePage from './HomePage'
import Details from './Details'
import * as Font from 'expo-font';
  

class App extends Component {

  constructor() {
    super();
    this.state = { 
      hasToken: false,
      isLoaded: false };
  }

  componentDidMount() {
    Font.loadAsync({
      'SourceCodePro-Black': require('./assets/fonts/SourceCodePro-Regular.ttf'),
      'SourceCodePro-Light': require('./assets/fonts/SourceCodePro-Light.ttf'),
      'SourceCodePro-Regular': require('./assets/fonts/SourceCodePro-Regular.ttf'),
    });
    AsyncStorage.getItem('token').then((token) => {
      this.setState({ 
        hasToken: token !== null
      })
    })
    .then(()=>this.setState({isLoaded:true}));
  }

  render() {

    if (!this.state.isLoaded) {
      return (
        <ActivityIndicator/>
      )
    }else{
      return(
        <Router navigationBarStyle={{backgroundColor: '#2054A0'}}>
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
              title='LOG OUT'
              titleStyle={{fontWeight: 'normal',fontFamily: 'SourceCodePro-Black',color: '#FFFFFF'}}
            />
            <Scene
              component={Details}
              key='Details'
              title='DETAILS'
              show
              titleStyle={{fontWeight: 'normal',fontFamily: 'SourceCodePro-Black',color: '#FFFFFF'}} 
            />
          </Scene>
        </Router>
      )
    }
  }
}


export default App

