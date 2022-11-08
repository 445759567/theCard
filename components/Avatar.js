import ShadowCard from "./ShadowCard";
import React from "react";
import {Image} from "react-native";

export const Avatar = ({uri, size}) =>{
    return(
        <ShadowCard style={{position:'absolute', right:10, top:10,borderRadius:100, height:size, width:size}}>
            <Image source={{uri:uri}} style={{width:'100%', height:'100%', borderRadius:100}}/>
        </ShadowCard>

    )
}