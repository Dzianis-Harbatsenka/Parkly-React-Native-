import React, {Component} from 'react';
import {
  Alert, 
  Text, 
  TouchableOpacity, 
  View, 
  StyleSheet,
  AsyncStorage
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import DetailsList from './DetailsList'

class HomePage extends Component {

  constructor(props){
    super(props);
    this.state={
      data:[]
    };
  }

  getProtectedQuote = () =>{
    AsyncStorage.getItem('token').then((token) => {
      fetch('http://parklybe.us-east-1.elasticbeanstalk.com/Booking', {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
      })
      .then((response) => response.json())
      .then((responceData) => {
        Alert.alert('DONE!'),
        this.setState({
          data: responceData
        })
      })
      .done();
    })
  }

  async userLogout() {
    try {
      await AsyncStorage.removeItem('token');
      Alert.alert('Logout Success!');
      Actions.Authentication();
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  render() {
      return (
        <View style={styles.container}>
          <TouchableOpacity  onPress={this.getProtectedQuote.bind(this)}>
            <Text > GET DATA </Text>
          </TouchableOpacity>

          <TouchableOpacity  onPress={this.userLogout}>
            <Text  > Log out </Text>
          </TouchableOpacity>
          
          <TouchableOpacity  onPress={()=>{console.log(this.state.data)}}>
            <Text  > CHECK_DATA</Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={()=>{AsyncStorage.getItem('token').then((token)=>{
            console.log(token);
            return true;})}}>
            <Text > Check TOKEN </Text>
          </TouchableOpacity>
          <DetailsList data={this.state.data}></DetailsList>
        </View>
      );
  }
}

export default HomePage;
//<DetailsList data={this.state.data}></DetailsList>

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


