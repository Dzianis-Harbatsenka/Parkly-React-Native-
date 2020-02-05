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
  RefreshControl,
  ActivityIndicator,
  BackHandler,
  NetInfo 
} from 'react-native';




class HomePage extends Component {

  constructor(props){
    super(props);
    this.state={
      data:[],
      isLoading: true,
      isConnected: true
    };
  }

  Backha
  async userLogout(navigation) {
    try {
      await AsyncStorage.removeItem('token');
      Alert.alert('Logout Success!');
      navigation.navigate('Authentication');
    } 
    catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  static navigationOptions = ({navigation})=>{
    return {
      title : '',
      headerStyle: {
        backgroundColor: '#2054A0'
      },
      headerLeft: ()=>(
        <TouchableOpacity disabled={!navigation.getParam('isConnected')} onPress={()=>navigation.navigate('Authentication')}>
          <Text style={styles.logout}> LOG OUT </Text>
        </TouchableOpacity>
        )
    }
  }

  componentDidMount(){
    this.getProtectedQuote();
    this.props.navigation.setParams({userLogout: ()=>this.userLogout(this.props.navigation)});
    this.props.navigation.setParams({isConnected: this.state.isConnected});
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    this.userLogout(this.props.navigation);
    
  }

  handleConnectivityChange=(connection)=>{
    this.setState({isConnected: connection});
    this.props.navigation.setParams({isConnected: this.state.isConnected});
  }

  handleBackPress =()=>{
    return true;
  }


  getProtectedQuote = () =>{
    this.setState({
      isLoading: true
    })
    AsyncStorage.getItem('token').then((token) => {
      fetch('http://parklybe2.us-east-1.elasticbeanstalk.com/booking', {
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
    setTimeout(this.getProtectedQuote,200);
  }

  

  render() {

      const {data,isLoading}=this.state;

      if(isLoading){
        return (
          <View style={styles.container}>
            <View style={styles.loading}>
              <ActivityIndicator size={80} color='#2054A0'></ActivityIndicator>
            </View>
          </View>
        )
      }

      if(!this.state.isConnected){
        return (
          <View style={styles.container}>
            <View style={styles.loading}>
              <Text style={styles.login}>No internet</Text>
              <ActivityIndicator size={80} color='#2054A0'></ActivityIndicator>
            </View>
        </View>
        )
      }

      return (
        <View style={styles.container}>
          <ScrollView refreshControl={
            <RefreshControl 
              onRefresh={this.onRefresh}
              colors={["#FFFFFF"]}
              progressBackgroundColor='#2054A0'
              title="Refresh"
              ></RefreshControl>
          } overScrollMode='always'>
            {data.map(item=>
              <DataList key={item.id} item={item} navigation={this.props.navigation}></DataList>
            )}
          </ScrollView>
        </View>
      );
  }
}

export default HomePage;

const DataList =(props)=>{

  const {item, navigation}=props;

  return(
    <View>
      <TouchableOpacity onPress={()=>navigation.navigate('Details',{data:item})}>
        <View style={styles.listelement}>
          <View>
            <View style={styles.row}>
              <Text style={styles.boldtext}>ID:</Text>
              <Text style={styles.text}>{item.id}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.boldtext}>User ID:</Text>
              <Text style={styles.text}>{item.userId}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.boldtext}>Parking ID:</Text>
              <Text style={styles.text}>{item.parkingId}</Text>
            </View>
            <View style={styles.rowend}>
              <Text style={styles.boldtext}>Booked:</Text>
              <Text style={styles.text}>{item.bookDate}</Text>
            </View>
            <View style={styles.rowend}>
              <Text style={styles.boldstart}>Start: </Text>
              <Text style={styles.start}>{item.startDate}</Text>
            </View>
            <View style={styles.rowend}>
              <Text style={styles.boldend}>End: </Text>
              <Text style={styles.end}>{item.endDate}</Text>
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
  boldstart: {
    fontSize: 14,
    marginLeft:10,
    marginBottom:5,
    marginTop: 5,
    fontFamily: 'OpenSans-Bold',
    color: 'green'
  },
  start: {
    fontSize: 14,
    margin: 5,
    fontFamily: 'OpenSans-Regular',
    color: 'green'
  },
  boldtext: {
    fontSize: 14,
    marginLeft:10,
    marginBottom:5,
    marginTop: 5,
    fontFamily: 'OpenSans-Bold'
  },
  text: {
    fontSize: 14,
    margin: 5,
    fontFamily: 'OpenSans-Regular'
  },
  boldend: {
    fontSize: 14,
    marginLeft:10,
    marginBottom:5,
    marginTop: 5,
    fontFamily: 'OpenSans-Bold',
    color: 'red'
  },
  end: {
    fontSize: 14,
    margin: 5,
    fontFamily: 'OpenSans-Regular',
    color: 'red'
  },
  logout: {
    marginLeft: 5,
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
    justifyContent: 'flex-start'
  },
  rowend: {
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
  },
  login: {
    textAlign:'center',
    fontSize: 18,
    margin: 10,
    fontFamily: 'SourceCodePro-Black',
    color: '#2054A0'
  },
});


