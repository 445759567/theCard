import { View} from "react-native";
import React from "react";
import {connect} from "react-redux";
import {colors, imageRadio} from "../globalVariables";
import IKidzSkeleton from "./skeleton";
import ShadowCard from "./ShadowCard";

function PlaceSkeleton ({onPress, style, ...props}){
    return (
        <ShadowCard style={[{marginHorizontal:0, marginVertical:0, borderRadius:10, width:'100%', height:'100%'}, style]}>
            <View style={{width:'100%', height:undefined, backgroundColor:colors.grey2, borderRadius:10}}/>
            <View style={{position:'absolute', bottom:10, left:10}}>

                <IKidzSkeleton width={'70%'} height={20} style={{marginTop:10, marginLeft:0}}/>
                <View style={{flexDirection:'row', marginTop:10, marginLeft:0}}>
                    <IKidzSkeleton circle width={20} height={20}/>
                    <IKidzSkeleton width={'70%'} height={20} style={{marginLeft:10}}/>
                </View>
            </View>
        </ShadowCard>
    );
}
const mapState = (state) => {
    return{
        darkMode: state.account.darkMode
    }
}

export default connect(mapState, null)(PlaceSkeleton)