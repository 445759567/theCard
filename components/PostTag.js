import {View} from "react-native";
import React from "react";
import {connect} from "react-redux";
import {NormalText} from "./index";
import {colors} from "../globalVariables";


function PostTag ({onPress, label, color, backgroundColor, size, ...props}){
    return (
        <View style={{borderWidth:1, borderRadius:5, paddingHorizontal:5, marginRight:10, marginBottom:10, borderColor:color, backgroundColor:backgroundColor || colors.white}}>
            <NormalText style={{color:color}} fontSize={size || 11.5}>{label}</NormalText>
        </View>
    );
}
const mapState = (state) => {
    return{
        darkMode: state.account.darkMode
    }
}

export default connect(mapState, null)(PostTag)