import {normalizeIconSize} from "../functions/sizeNormalize";
import {Image, View} from "react-native";
import iconDeal from "../assets/icons/Deal4.png";
import React from "react";

export const DealIcon = ({dealNumber, style, iconSize}) =>{
    const size = normalizeIconSize(iconSize || 30)
    return(
        (dealNumber && dealNumber.length > 0)?
            <View style={[{backgroundColor: 'transparent', alignItems: 'center', flexDirection:'row', borderRadius:100, padding:5}, style]}>
                <Image source={iconDeal} style={{height:size, width:size}}/>
            </View>:null
    )
}