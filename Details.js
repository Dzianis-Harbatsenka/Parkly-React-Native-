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

    render(){

      const item=this.props.data;

      return(
            <View style={styles.container}>
                <ScrollView>
                  <View style={styles.within}>
                    <Text style={styles.label}>Booking information</Text>
                      <View>
                        <View style={styles.row}>
                          <Text style={styles.text}>ID:</Text>
                          <Text style={styles.text}>{item.id}</Text>
                        </View>
                        <View style={styles.row}>
                          <Text style={styles.text}>User ID:</Text>
                          <Text style={styles.text}>{item.userId}</Text>
                        </View>
                        <View style={styles.row}>
                          <Text style={styles.text}>Parking ID</Text>
                          <Text style={styles.text}>{item.parkingId}</Text>
                        </View>
                        <View style={styles.row}>
                          <Text style={styles.text}>Parking Spot ID: </Text>
                          <Text style={styles.text}>{item.parkingSpotId}</Text>
                        </View>
                        <View style={styles.row}>
                          <Text style={styles.text}>Place number: </Text>
                          <Text style={styles.text}>{item.placeNumber}</Text>
                        </View>
                        <View style={styles.row}>
                          <Text style={styles.text}>Paid amount: </Text>
                          <Text style={styles.text}>{item.paidAmount} zl.</Text>
                        </View>
                        <View style={styles.row}>
                          <Text style={styles.text}>Active: </Text>
                          <Text style={styles.text}>{item.active.toString()}</Text>
                        </View>
                        <View style={styles.row}>
                          <Text style={styles.text}>Booked: </Text>
                          <Text style={styles.text}>{item.bookDate}</Text>
                        </View>
                        <View style={styles.row}>
                          <Text style={styles.text}>Start: </Text>
                          <Text style={styles.text}>{item.startDate}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.text}>End:</Text>
                            <Text style={styles.text}> {item.endDate}</Text>
                        </View>
                      </View>
                      <Divider/>
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
    text: {
      margin: 15,
      fontSize: 15,
      fontFamily: 'OpenSans-Regular',
    },
    label: {
      margin: 20,
      fontSize: 20,
      textAlign: 'center',
      fontFamily: 'SourceCodePro-Black',
      color: '#2054A0'
    },
    row: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    divider: {

    }
  });
  

  /*
   <Text style={styles.label}>Parking spot information</Text>
                    <View>
                      <View style={styles.row}>
                        <Text style={styles.text}>Spot ID: </Text>
                        <Text style={styles.text}>{spot.id}</Text>
                      </View>
                      <View style={styles.row}>
                        <Text style={styles.text}>Place number: </Text>
                        <Text style={styles.text}>{spot.placeNumber}</Text>
                      </View>
                      <View style={styles.row}>
                        <Text style={styles.text}>Parking spot ID: </Text>
                        <Text style={styles.text}>{spot.parkingSpotId}</Text>
                      </View>
                    </View>
                    <Divider/>
                    <Text style={styles.label}>Parking information</Text>
                    <View>
                      <View style={styles.row}>
                        <Text style={styles.text}>Parking ID: </Text>
                        <Text style={styles.text}>{parking.id}</Text>
                      </View>
                      <View style={styles.row}>
                        <Text style={styles.text}>Name: </Text>
                        <Text style={styles.text}>{parking.name}</Text>
                      </View>
                      <View style={styles.row}>
                        <Text style={styles.text}>City: </Text>
                        <Text style={styles.text}>{parking.city}</Text>
                      </View>
                      <View style={styles.row}>
                        <Text style={styles.text}>Address: </Text>
                        <Text style={styles.text}>{parking.address}</Text>
                      </View>
                      <View style={styles.row}>
                        <Text style={styles.text}>ZIP: </Text>
                        <Text style={styles.text}>{parking.zip}</Text>
                      </View>
                      <View style={styles.row}>
                        <Text style={styles.text}>Price: </Text>
                        <Text style={styles.text}>{parking.price}</Text>
                      </View>
                      <View style={styles.row}>
                        <Text style={styles.text}>Description: </Text>
                        <Text style={styles.text}>{parking.description}</Text> 
                      </View>
                      <View style={styles.row}>
                        <Text style={styles.text}>Numer of spots: </Text>
                        <Text style={styles.text}>{parking.nspots}</Text>
                      </View>
                    </View>
                     */