import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextBase, Button, Alert, AsyncStorage } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state= {
      username: "",
      password: "",
      STORAGE_KEY: 'id_token',
      data: []
    }
    this.AssignLogin=this.AssignLogin.bind(this);
    this.AssignPassword=this.AssignPassword.bind(this);
    this.__onPressReset=this.__onPressReset.bind(this);
    this._userLogin=this._userLogin.bind(this);
  }

  AssignLogin(event) {
    this.setState({
      username: event
    });
  }

  AssignPassword(event) {
    this.setState({
      password: event
    });
  }

  __onPressReset() {
    this.setState({
      username: "",
      password: ""
    });
  }

    _getProtectedQuote=()=>{
    var DEMO_TOKEN = this.state.STORAGE_KEY;
    console.log("DEMO TOKEN",DEMO_TOKEN);
    fetch("http://parklybe.us-east-1.elasticbeanstalk.com/Boooking", {
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + DEMO_TOKEN
      }
    })
    .then((response) => response.json())
    .then((responceData) => {
      Alert.alert(
        "complete somehow")
      this.setState({
        data: responceData
      })
    })
    .done();
  }

  _userLogin=()=>{
    fetch("http://parklybe.us-east-1.elasticbeanstalk.com/admin", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: "Denizzz",//this.state.username,
        password: "zzzineD"//this.state.password,
      })
    })
    .then((response) => response.json())
    .then((responseData) => {
      Alert.alert(
        "Login Success!"
      )
      this.setState({
        STORAGE_KEY: responseData.token
      })
    })
    .done();
  }
  

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>PARKLY</Text>
        <Text style={styles.instructions}>login</Text>
        <TextInput style={styles.textbox} onChangeText={this.AssignLogin}>{this.state.login}</TextInput>
        <Text style={styles.instructions}>password</Text>
        <TextInput style={styles.textbox} onChangeText={this.AssignPassword} secureTextEntry={true}>{this.state.password1}</TextInput>
        <Text style={styles.instructions}>{instructions}</Text>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between'
          }}>
          <Button style={styles.button} title='login' onPress={this._userLogin}></Button>
          <Button style={styles.button} title='reset' onPress={this.__onPressReset}></Button>
        </View>
        <Button style={styles.button} title='show' onPress={this._getProtectedQuote}></Button>
        <Text>{this.state.STORAGE_KEY}</Text>
        <Text>{this.state.data}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    marginBottom: 100,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  textbox: {
    borderWidth: 1,
    margin: 10,
    width: 200,
    textAlign: "center"
  },
  button: {
    margin: 10,
    width: 50,
    height: 40,
  }
});


