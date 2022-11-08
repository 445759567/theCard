import {TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {colors} from "../globalVariables";
import NormalText from "./normalText";


function RatingStar ({rating, button, starSize, onRating, ...props}){
    const [rate, setRate] = useState(0)
    useEffect(()=>{
       setRate(Number(rating))
    },[rating])
    const onStarPress = (item) =>{
        setRate(item)
        if(onRating){
            onRating(item)
        }
    }
    return (
        <View style={{flexDirection:'row', alignItems:'center'}}>
            {/*<NormalText style={{marginRight:10}}>{rating}</NormalText>*/}
            <View style={{flexDirection:'row'}}>
                {
                    [1,2,3,4,5].map((item, index)=>{
                        return(
                            <TouchableOpacity key={index} onPress={() => onStarPress(item)} disabled={!button}>
                                <MaterialCommunityIcons name="star" size={starSize?starSize:23} style={{color:item <= rate? colors.yellow: colors.grey, marginRight:0}}/>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        </View>
    );
}
const mapState = (state) => {
    return{
        darkMode: state.account.darkMode
    }
}

export default connect(mapState, null)(RatingStar)