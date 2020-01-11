import React, {Component} from 'react';
import {
  Alert, 
  Text, 
  TouchableOpacity, 
  View, 
  StyleSheet,
  AsyncStorage,
  ScrollView
} from 'react-native';

class Details extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={styles.container}>
                <Text>The details window check</Text>
                <Text>the result of endDate below</Text>
                <Text>{this.props.data.endDate}</Text>
            </View>
        )
    }
}

export default Details

const styles = StyleSheet.create({
    container: {
      flex:1,
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
    },
    listelement: {
      flex: 1,
      resizeMode: 'cover',
      margin: 10,
      borderWidth: 1
    },
    text: {
      margin: 10
    }
  
  });
  