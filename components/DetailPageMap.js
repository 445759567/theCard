import {colors} from "../globalVariables";
import {Platform, TouchableOpacity, View} from "react-native";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import NormalText from "./normalText";
import Map from "../View/PlaceToGoDetail/Map";
import ShadowCard from "./ShadowCard";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import React from "react";


export const DetailPageMap = ({lat, lng, onDirectionPress, location}) =>{
    return(
        <View style={{width:'100%', backgroundColor:colors.white, paddingVertical:10, paddingHorizontal:20}}>
            <TouchableOpacity style={{flexDirection:'row', alignItems:'center', marginBottom:10}} onPress={onDirectionPress}>
                <SimpleLineIcons name="location-pin" size={20} style={{color:colors.black, width:30}} />
                <NormalText style={{flex:1}} numberOfLines={1} font={'lighter'} fontSize={13}>{location}</NormalText>
            </TouchableOpacity>
            <Map lat={Number(lat)} lng={Number(lng)}/>
            <ShadowCard style={{position:'absolute', bottom:10, right:30, backgroundColor:colors.white, borderRadius:50}} onPress={onDirectionPress}>
                <MaterialIcons name="assistant-direction" size={30} color={colors.yellow} />
            </ShadowCard>
        </View>
    )
}