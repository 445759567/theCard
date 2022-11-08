import {PixelRatio, Platform, StyleSheet, Text} from "react-native";
import React from "react";
import {connect} from "react-redux";
import {windowWidth} from "../globalVariables";
import {sizeNormalize} from "../functions";


const styles = StyleSheet.create({
    darkMode:{
        color: 'white',
        transform:[
            {translateY:Platform.OS === 'ios'?0:2}
        ]
    },
    lightMode:{
        color: '#6b6b6b',
        padding:0,
        margin:0,
        transform:[
            {translateY:Platform.OS === 'ios'?0:2}
        ]
    },
})

export const getFontSize = (fontSize) =>{
    let scaledSize
    if(!fontSize){
        scaledSize = 14 * windowWidth/320
    }else {
        scaledSize = fontSize * windowWidth/320
    }
    if(Platform.OS === 'ios'){
        return Math.round(PixelRatio.roundToNearestPixel(scaledSize)) - PixelRatio.get()/2
    }else{
        return Math.round(PixelRatio.roundToNearestPixel(scaledSize)) - PixelRatio.get()/2
    }
}
function NormalText ({italic, font, numberOfLines, fontSize, selectable, adjustsFontSizeToFit, ...props}) {
    const getFontFamily = () =>{
        switch (font) {
            case 'bold':
                if(italic){
                    return('Poppins-Bold')
                }else{
                    return('Poppins-Bold')
                }
            case 'lighter' || '100':
                if(italic){
                    return('Poppins-LightItalic')
                }else{
                    return('Poppins-Light')
                }
            case 'normal' || 'regular':
                if(italic){
                    return('Poppins-Regular')
                }else{
                    return('Poppins-Regular')
                }
            case 'medium' || '500':
                return('Poppins-Medium')
            default:
                return('Poppins-Regular')
        }
    }
    return (
        <Text style={[styles.lightMode, {fontFamily: getFontFamily(), fontSize: sizeNormalize.normalizeFontSize(fontSize)}, props.style]} adjustsFontSizeToFit={adjustsFontSizeToFit} selectable={selectable} numberOfLines={numberOfLines}>
            {props.children}
        </Text>
    );
}
const mapState = (state) => {
    return{
        // darkMode: state.account.darkMode
    }
}

export default connect(mapState, null)(NormalText)