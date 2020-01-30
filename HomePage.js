import React, {Component} from 'react';
import {
  Alert, 
  Text, 
  TouchableOpacity, 
  View, 
  StyleSheet,
  AsyncStorage,
  ScrollView,
  Image,
  RefreshControl
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import { Divider } from 'react-native-elements';




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
    this.setState({
      isLoading: true
    })
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

  onRefresh = () => {
    this.getProtectedQuote();
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
            <View style={{backgroundColor: '#2054A0'}}>
              <TouchableOpacity onPress={this.userLogout}>
                <Text style={styles.logout}> LOG OUT </Text>
              </TouchableOpacity>   
              <Divider style={styles.divider}></Divider>         
            </View>
            <View style={styles.loading}>
              <Text style={styles.text}>...Loading</Text>
            </View>
          </View>
        )
      }

      return (
        <View style={styles.container}>
          <View style={{backgroundColor: '#2054A0'}}>
            <TouchableOpacity onPress={this.userLogout}>
              <Text style={styles.logout}> LOG OUT </Text>
            </TouchableOpacity>   
            <Divider style={styles.divider}></Divider>         
          </View>
          
          <ScrollView refreshControl={
            <RefreshControl 
              onRefresh={this.onRefresh}
              colors={["#FFFFFF"]}
              progressBackgroundColor='#2054A0'
              title="Refresh"
              ></RefreshControl>
          } overScrollMode='always'>
            {data.map(item=>
              <DataList key={item.id} item={item}></DataList>
            )}
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
          <View>
            <View style={styles.row}>
              <Text style={styles.text}>ID:{item.id}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>User ID: {item.userId}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>Parking ID: {item.parkingId}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>Booked: {item.startDate}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.start}>Start: {item.startDate}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.end}>End: {item.endDate}</Text>
            </View>
          </View>
          <Image style={styles.image} source={require('./LogoDay.jpg')}></Image>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',

  },
  listelement: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  start: {
    fontSize: 14,
    marginLeft:10,
    marginBottom:5,
    marginTop: 5,
    fontFamily: 'OpenSans-Regular',
    color: 'green'
  },
  text: {
    fontSize: 14,
    marginLeft:10,
    marginBottom:5,
    marginTop: 5,
    fontFamily: 'OpenSans-Regular'
  },
  end: {
    fontSize: 14,
    marginLeft:10,
    marginBottom:5,
    marginTop: 5,
    fontFamily: 'OpenSans-Regular',
    color: 'red'
  },
  logout: {
    marginLeft: 20,
    marginTop: 40,
    marginBottom: 15,
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'SourceCodePro-Black',
    color: '#FFFFFF'
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: '#FFFFFF',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  image: {
    margin: 10,
    width: 100,
    height: 100
  },
  divider: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  }
});


