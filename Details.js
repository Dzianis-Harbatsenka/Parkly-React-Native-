import React, {Component} from 'react';
import {
  Text, 
  View, 
  StyleSheet,
  ScrollView
} from 'react-native';
import { Divider } from 'react-native-elements';




class Details extends Component {

    constructor(props){
        super(props);
    }

    static navigationOptions = ({navigation})=>{
      return {
        title : 'DETAILS',
        headerTintColor:'#FFFFFF', 
        headerTitleStyle:{
          fontWeight: 'normal',
          fontSize: 20,
          fontFamily: 'SourceCodePro-Black',
        },
        headerStyle: {
          backgroundColor: '#2054A0'
        },
      }
    }

    render(){

      const {navigation}=this.props;
      const item=navigation.getParam('data')

      return(
            <View style={styles.container}>
                <ScrollView>
                  <View style={styles.within}>
                    <Text style={styles.label}>BOOKING INFORMATION</Text>
                    <Divider style={styles.devider}/>
                      <View>
                        <View style={styles.row}>
                          <Text style={styles.bold_text}>ID:</Text>
                          <Text style={styles.text}>{item.id}</Text>
                        </View>
                        <View style={styles.row}>
                          <Text style={styles.bold_text}>User ID:</Text>
                          <Text style={styles.text}>{item.userId}</Text>
                        </View>
                        <View style={styles.row}>
                          <Text style={styles.bold_text}>Parking ID:</Text>
                          <Text style={styles.text}>{item.parkingId}</Text>
                        </View>
                        <View style={styles.row}>
                          <Text style={styles.bold_text}>Parking Spot ID:</Text>
                          <Text style={styles.text}>{item.parkingSpotId}</Text>
                        </View>
                        <View style={styles.row}>
                          <Text style={styles.bold_text}>Place number: </Text>
                          <Text style={styles.text}>{item.placeNumber}</Text>
                        </View>
                        <View style={styles.row}>
                          <Text style={styles.bold_text}>Paid amount:</Text>
                          <Text style={styles.text}>{item.paidAmount} zl.</Text>
                        </View>
                        <View style={styles.row}>
                          <Text style={styles.bold_text}>Active:</Text>
                          <Text style={styles.text}>{item.active.toString()}</Text>
                        </View>
                        <View style={styles.row}>
                          <Text style={styles.bold_text}>Booked:</Text>
                          <Text style={styles.textend}>{item.bookDate}</Text>
                        </View>
                        <View style={styles.row}>
                          <Text style={styles.bold_text}>Start:</Text>
                          <Text style={styles.textend}>{item.startDate}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.bold_text}>End:</Text>
                            <Text style={styles.textend}> {item.endDate}</Text>
                        </View>
                      </View>
                      <Divider style={styles.devider}/>
                  </View>
                </ScrollView>
             
            </View>
        )
    }
}

export default Details

const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: '#FFFFFF',
    },
    within: {
      margin: 5
    },
    bold_text: {
      margin: 5,
      marginLeft: 15,
      fontSize: 15,
      fontFamily: 'OpenSans-Bold',
    },
    text: {
      marginBottom: 5,
      marginTop: 5,
      fontSize: 15,
      textAlign: 'right',
      fontFamily: 'OpenSans-Regular',
    },
    textend: {
      marginBottom: 5,
      marginTop: 5,
      marginRight: '30%',
      fontSize: 15,
      textAlign: 'right',
      fontFamily: 'OpenSans-Regular',
    },
    label: {
      marginTop: 15,
      marginLeft: 15,
      fontSize: 20,
      textAlign: 'left',
      fontFamily: 'SourceCodePro-Black',
      color: '#2054A0'
    },
    row: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    deteils: {
      fontSize: 20,
      fontFamily: 'SourceCodePro-Black',
      color: '#FFFFFF'
    },
    rowend: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    devider: {
      height: 5, 
      backgroundColor: '#2054A0',
      marginLeft: 15,
      marginBottom: 5,
      opacity: 0.6
    }
  });
  