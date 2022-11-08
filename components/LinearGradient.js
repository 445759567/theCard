// import {View} from "react-native";
import React from "react";
import {connect} from "react-redux";
import {LinearGradient as ExpoLinear} from "expo-linear-gradient";
// import {colors as color} from "../globalVariables";


function LinearGradient ({colors, style, ...props}){
    return (
        // <View style={[{backgroundColor: color.opacityGrey}, style]}>
        //     {props.children}
        // </View>
        <ExpoLinear colors={colors} style={style}>
            {props.children}
        </ExpoLinear>
    );
}
const mapState = (state) => {
    return{
        darkMode: state.account.darkMode
    }
}

export default connect(mapState, null)(LinearGradient)