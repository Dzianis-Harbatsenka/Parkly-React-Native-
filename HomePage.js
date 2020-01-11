import React, {Component} from 'react';
import {
  Alert, 
  Text, 
  TouchableOpacity, 
  View, 
  StyleSheet,
  AsyncStorage,
  ScrollView,
  Button
} from 'react-native';
import {Actions} from 'react-native-router-flux';

class HomePage extends Component {

  constructor(props){
    super(props);
    this.state={
      data:[],
      isLoading: true
    };
  }


  componentDidMount(){
    this.getProtectedQuote();
  }

  getProtectedQuote = () =>{
    AsyncStorage.getItem('token').then((token) => {
      fetch('http://parklybe.us-east-1.elasticbeanstalk.com/Booking', {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
      })
      .then((response) => response.json())
      .then((responceData) => {
        this.setState({
          data: responceData
        })
      })
      .then(()=>
        this.setState({
          isLoading: false
        })
      )
      .done();
    })
  }

  async userLogout() {
    try {
      await AsyncStorage.removeItem('token');
      Alert.alert('Logout Success!');
      Actions.Authentication();
    } 
    catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  render() {

      const {data,isLoading}=this.state;

      if(isLoading){
        return (
          <View style={styles.container}>
            <Text>...Loading</Text>
          </View>
        )
      }

      return (
        <View style={{flex: 1,backgroundColor: '#F5FCFF'}}>
          <TouchableOpacity style={{marginTop: 30, textAlign: 'left'}}  onPress={this.userLogout}>
            <Text> Log out </Text>
          </TouchableOpacity>

          <ScrollView>
            {data.map(item=>
            <DataList key={item.id} item={item}></DataList>
            )
            }
          </ScrollView>

          
        </View>
      );
  }
}

export default HomePage;

const DataList =(props)=>{

  const item=props.item;

  return(
    <View>
      <TouchableOpacity onPress={()=>Actions.Details({ data: item })}>
        <View style={styles.listelement}>
          <Text style={styles.text}>{item.id}</Text>
          <Text style={styles.text}>{item.startDate}</Text>
          <Text style={styles.text}>{item.endDate}</Text>
          <Text style={styles.text}>{item.active.toString()}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}
//<DetailsList data={this.state.data}></DetailsList>
/*
<FlatList
            data={data}
            renderItem={info=>
              <View style={styles.container}>
                <TouchableOpacity onPress={()=>console.log(info.id)}>
                  <Text>touch</Text>
                </TouchableOpacity>
              </View>  
            }
            keyExtractor={item => item.id.toString()}
          />
*/
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


