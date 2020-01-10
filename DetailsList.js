import React,{Component} from 'react'
import {
    Text, 
    View,
    TouchableOpacity
  } from 'react-native';

class DetailsList extends Component{
    /*constructor(props){
        super(props);
        this.state={
            data: this.props.data
        }
    }*/

    render(){
        const list = this.props.data.map((data)=>{
            <Text>{data.username}</Text>
        })
        return(
            <View>
                {list}
            </View>
        )
    }
}

export default DetailsList;

/*{this.props.data.map((data)=>{
    return (
       <View>
           <Text>{data.id}</Text>
       </View>
       )
   })}*/