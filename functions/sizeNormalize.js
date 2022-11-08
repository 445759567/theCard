import {windowWidth} from "../globalVariables";
import {PixelRatio, Platform} from "react-native";

export const normalizeFontSize = (fontSize) =>{
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
export const normalizeIconSize = (iconSize) =>{
    let size
    if(!iconSize){
        size = 26 * windowWidth/320
    }else{
        size = iconSize * windowWidth/320
    }

    if(Platform.OS === 'ios'){
        size = Math.round(PixelRatio.roundToNearestPixel(size)) - PixelRatio.get()/2
    }else{
        size = Math.round(PixelRatio.roundToNearestPixel(size)) - PixelRatio.get()/2
    }
    return size
}