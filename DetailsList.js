import React,{Component} from 'react'
import {
    Text, 
    View,
    TouchableOpacity
  } from 'react-native';

class DetailsList extends Component{
    constructor(props){
        super(props);
        this.state={
            data: this.props.data
        }
    }

    render(){
        return(
           
            <View>
                <TouchableOpacity onPress={()=>{console.log(this.state.data)}}></TouchableOpacity>
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