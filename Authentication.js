import React, {Component} from 'react';
import {
  Text, 
  TextInput,
  TouchableOpacity, 
  View, 
  StyleSheet, 
  AsyncStorage, 
  Alert
} from 'react-native';
import {Actions} from 'react-native-router-flux';

class Authentication extends Component {

  constructor() {
    super();
    this.state = { 
        username: null, 
        password: null 
    };
  }

  async saveItem(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.error('AsyncStorage error: ' + error.message);
    }
  }


  userLogin() {
    if (!this.state.username || !this.state.password) 
      return;
    fetch('http://parklybe.us-east-1.elasticbeanstalk.com/admin', {
      method: 'POST',
      headers: { 
        'Accept': 'application/json', 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      })
    })
    .then((response) => response.json())
    .then((responseData) => {
      this.saveItem('token', responseData.token),
      Alert.alert('Login Success!'),
      Actions.HomePage();
    })
    .done();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text > PARKLY </Text>
        <View style={styles.welcome}>
          <TextInput
            editable={true}
            onChangeText={(username) => this.setState({username})}
            placeholder='Username'
            ref='username'
            returnKeyType='next'
            style={styles.textbox}
            value={this.state.username}
          />
          <TextInput
            editable={true}
            onChangeText={(password) => this.setState({password})}
            placeholder='Password'
            ref='password'
            returnKeyType='next'
            secureTextEntry={true}
            style={styles.textbox}
            value={this.state.password}
          />
          <TouchableOpacity  onPress={this.userLogin.bind(this)}>
            <Text > Log In </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Authentication;

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