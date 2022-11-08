import {getAxiosPure} from "../APIs/axiosCalls";
import {getPlaceDetailFromGoogleUrl} from "../APIs/apiUrls";
import {googleMapKey} from "../globalVariables";
import {showLocation} from "react-native-map-link";

export const getPlaceDetail = async (placeID) =>{
    const params = new URLSearchParams({
        placeid: placeID,
        key: googleMapKey,
    }).toString();
    console.log(params)
    return await getAxiosPure(params, getPlaceDetailFromGoogleUrl, 'get place details from google')
}

export const onDirectionPress = (lng, lat, location) =>{
    showLocation({
        longitude: lng,
        latitude: lat,
        title:location,
        dialogTitle:'Direction to',
        dialogMessage:location,
        alwaysIncludeGoogle: true,
    })
}