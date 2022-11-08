import LinearGradient from "./LinearGradient";
import React from "react";


export const FloatInfoContainer = ({borderRadius, ...props}) =>{
    return(
        <LinearGradient colors={['transparent', '#000000']} style={{padding:10, borderRadius:borderRadius || 10, width:'100%'}}>
            {props.children}
        </LinearGradient>
    )
}