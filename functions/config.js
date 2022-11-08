
import {Linking, Share} from "react-native";
import qs from "qs";
import * as SecureStore from "expo-secure-store";

export const shuffleArray = (arr) =>{
    // const arr = [0, 1, 2, 3, 4];
    for (let i = 1; i < arr.length; i++) {
        const random = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[random]] = [arr[random], arr[i]];
    }
    return arr;
}
export const getActivityTypeTitle = (typeID) =>{
    switch (typeID){
        case 1: //events
            return('Events')
        case 2:
            return('Learning')
        case 3://place to go
            return('PlaceToGo')
        case 4://Under 5
            return('Under5')
        case 5://Under 5
            return('Deals')
        default:
            return
    }
}
export const onWeblinkPress = async (link) =>{
    let canOpen = await Linking.canOpenURL(link)
    if(canOpen){
        await Linking.openURL(link)
    }else{
        alert('This link is invalid: \n'+link)
    }
}
export const onPhonePress = async (contactNumber) =>{
    if(!contactNumber){
        return
    }
    let url = `tel:${contactNumber}`
    const canOpen = await Linking.canOpenURL(url)
    if(canOpen){
        await Linking.openURL(url)
    }
}

export const onEmailPress = async (contact, setLoading) =>{
    if(!contact || contact.length < 1){
        return
    }
    let url = `mailto:${contact}`
    const query = qs.stringify({
        subject: 'Activity Enquiry From iKidz Go user',
        // body: 'body',
        // cc: 'cc',
        // bcc: 'bcc'
    });
    if (query.length) {
        url += `?${query}`;
    }
    const canOpen = await Linking.canOpenURL(url)
    if(canOpen && setLoading){
        setLoading(true)
        await Linking.openURL(url)
        setLoading(false)
    }else{
        await Linking.openURL(url)
    }
}


export const onShare = async (message) => {
    try {
        const result = await Share.share({
            message:message,
            // url:message,
            title:'iKidz Go'
        });
        if (result.action === Share.sharedAction) {
            console.log('result is:')
            console.log(result)
            if (result.activityType) {
                // shared with activity type of result.activityType
            } else {
                // shared
            }
        } else if (result.action === Share.dismissedAction) {
            console.log('result is:')
            console.log(result)
            // dismissed
        }
    } catch (error) {
        alert(error.message);
    }
};

export const checkNeedToLoad = (list, listLoading, listLoadingFailed) =>{
    return ((!list.empty && list.data.length < 1) || listLoadingFailed) && !listLoading
}
export const onLoadDetailPage = async (item, lat, lng, nav) =>{
    let pageName
    let section = item.section
    switch (item.section) {
        case 'event':
            pageName = 'eventDetailPage'
            break
        case 'class':
            pageName = 'learningDetailPage'
            break
        case 'learning':
            pageName = 'learningDetailPage'
            section = 'class'
            break
        case 'vendor':
            pageName = 'merchantDetailPage'
            section = 'classMerchant'
            break
        case 'place':
            pageName = 'placeToGoDetailPage'
            break
        default:
            return
    }
    const res = await wpEvent.getWPDetailAxios(lat, lng, section, item.id || item.ID, 20000)
    if(!res || !res[0] || !res[0].name){
        alert('Sorry, this activity is either expired or not found.')
        console.log(`${item.section} not found: ${item.id || item.ID}`)
        return
    }
    // props.setEventChosen(res[0])
    nav.push(pageName, res[0])
}
export const setTokenToSecureStore = async (user) =>{
    await SecureStore.setItemAsync(adKeys.AccessTokenKey, JSON.stringify(user))
    console.log('token is set to secure store')
}
export const removeTokenToSecureStore = async () =>{
    await SecureStore.setItemAsync(adKeys.AccessTokenKey, '')
}
export const getTokenInSecureStore = async () =>{
    return await SecureStore.getItemAsync(adKeys.AccessTokenKey)
}
export const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};
export const validatePassword = (password) =>{
    return String(password)
        .match(
            /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).{8,}$/
        );
}