import { View} from "react-native";
import React from "react";
import {connect} from "react-redux";
import {colors, windowWidth} from "../globalVariables";
import IKidzSkeleton from "./skeleton";
import ShadowCard from "./ShadowCard";

function EventSkeleton ({onPress, style, ...props}){

    return (
        <ShadowCard style={[{marginHorizontal:10, marginVertical:20, borderRadius:10, width:windowWidth*0.8, height:undefined, aspectRatio:16/9}, style]}>
            <View style={{width:'100%', flex:1, backgroundColor:colors.grey2, borderTopRightRadius:10, borderTopLeftRadius:10}}/>
            <IKidzSkeleton width={'70%'} height={20} style={{marginTop:10, marginLeft:10}}/>
            <View style={{flexDirection:'row', marginTop:10, marginLeft:10, marginBottom:5}}>
                <IKidzSkeleton circle width={20} height={20}/>
                <IKidzSkeleton width={'80%'} height={20} style={{marginLeft:10}}/>
            </View>
        </ShadowCard>
    );
}
const mapState = (state) => {
    return{
        darkMode: state.account.darkMode
    }
}

export default connect(mapState, null)(EventSkeleton)