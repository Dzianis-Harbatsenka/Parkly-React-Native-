import React, {Component} from 'react';
import {
  Text, 
  TextInput,
  TouchableOpacity, 
  View, 
  StyleSheet, 
  AsyncStorage,
  Alert,
  Image,
  ScrollView
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import * as Font from 'expo-font';
import { Base64 } from 'js-base64';

class Authentication extends Component {

  constructor() {

    super();
    this.state = { 
        username: null, 
        password: null,
        isLoading: true 
    };
  }

  componentDidMount() {
    
    Font.loadAsync({
      'SourceCodePro-Black': require('./assets/fonts/SourceCodePro-Regular.ttf'),
      'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf'),
      'SourceCodePro-Bold': require('./assets/fonts/SourceCodePro-Bold.ttf'),

    })
    .then(()=>this.setState({isLoading: false}))
    .done();
  }

  async saveItem(item, selectedValue) {

    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.error('AsyncStorage error: ' + error.message);
    }
  }

  encrypt_password = () => {

    var temp = Base64.encode(this.state.password);
    this.setState({ password: temp });
  }

  userLogin() {

    if (!this.state.username || !this.state.password) 
      return;

    this.encrypt_password();

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
    .then((response) => {
      if(response.status === 401)
        return null
      else
        return response.json()
    })
    .then((responseData) => {
        if(responseData == null)
          this.saveItem('token', null)
        else
          this.saveItem('token', responseData.token)
    })
    .then(()=>{  
      AsyncStorage.getItem('token').then(token=>{
        if(token==null)
          Alert.alert("Login or Password is incorrect!","Try again.")
        else
          Actions.HomePage()
      })
    })
    .done();
  }

  render() {

    const {isLoading}=this.state;

    if(isLoading){
      return null;
    }
    return (
      <View style={styles.outer}>
        <ScrollView>
          <View style={styles.container}>
            <Image style={styles.image} source={require('./LogoDay.jpg')}></Image>
            <Text style={styles.logo}> PARKLY </Text>
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
                <Text style={styles.login}> LOG IN </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Authentication;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  outer: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  logo: {
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'SourceCodePro-Black',
    color: '#2054A0'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  textbox: {
    borderWidth: 0.25,
    margin: 10,
    width: 200,
    textAlign: "center",
    fontFamily: 'OpenSans-Regular',
  },
  button: {
    margin: 10,
    width: 50,
    height: 40,
  },
  image: {
      marginTop: 50,
      width: 170,
      height: 170,
  },
  login: {
    textAlign:'center',
    fontSize: 18,
    margin: 10,
    fontFamily: 'SourceCodePro-Black',
    color: '#2054A0'
  }
});
