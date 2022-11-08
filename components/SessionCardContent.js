import {Image, TouchableOpacity, View} from "react-native";
import {colors, imageRadio, windowWidth} from "../globalVariables";
import NormalText from "./normalText";
import moment from "moment";
import lightBackground from "../assets/lightGreyBackground.png";
import React from "react";
import IKidzSkeleton from "./skeleton";
import QRCodeGenerator from "react-native-qrcode-svg";

export const SessionCardContent = ({session, image, eventName, selectedIndex, onActivityTitlePress, imageLoading, link}) =>{
    return(
        <View>
            <View style={{flexDirection:'row', marginTop:25, alignItems:'center', justifyContent:'space-between', width:'100%', borderWidth:0, borderColor:colors.yellow}}>
                <View style={{flexDirection:'row', marginLeft:0, alignItems:'center', paddingRight:10, borderRightWidth:0, height:'100%', borderColor:colors.yellow}}>
                    <View style={{width:3, height:'80%', borderRadius:5, backgroundColor:colors.yellow, marginRight:10}}/>
                    <NormalText style={{fontSize:24, color:colors.black}}>{moment(session.sessionDate).format('LT')}</NormalText>
                </View>
                <View style={{alignItems:'flex-end'}}>
                    <NormalText style={{color:colors.grey, fontSize:10}}>{moment(session.sessionDate).format('dddd')}</NormalText>
                    <NormalText>{moment(session.sessionDate).format('DD MMM YYYY')}</NormalText>
                </View>
            </View>
            <View style={{width:'100%', alignItems:'center', marginVertical:10, marginTop:20}}>
                {
                    imageLoading?
                        <IKidzSkeleton width={'100%'} height={120}/>:
                        <Image
                            source={(image && image.length>0 && image[0].imageData)?{uri: image[selectedIndex%image.length].imageData}: lightBackground}
                            style={{width: '100%', aspectRatio:imageRadio, height:undefined, borderRadius:10}}
                            resizeMode={'cover'}
                        />
                }
                {/*{*/}
                {/*    (!imageLoading && link) &&*/}
                {/*    <View style={{position:'absolute', right:10, top:10, padding:3, backgroundColor:colors.white}}>*/}
                {/*        <QRCodeGenerator*/}
                {/*            value={link}*/}
                {/*            size={windowWidth*0.1}*/}
                {/*            // logo={logo}*/}
                {/*        />*/}
                {/*    </View>*/}
                {/*}*/}
            </View>
            <View style={{width:'100%', marginBottom:25}}>
                <TouchableOpacity onPress={onActivityTitlePress}>
                    <NormalText font={'bold'} style={{fontSize:17}} numberOfLines={3}>{eventName} <NormalText>({session.sessionDuration}min)</NormalText></NormalText>
                </TouchableOpacity>
                <View style={{flexDirection:'row', alignItems:'center', marginTop:20}}>
                    <View style={{height:'80%', width:3, borderRadius:5, backgroundColor:colors.yellow, marginRight:10}}/>
                    <View>
                        {/*<NormalText font={'bold'} numberOfLines={1}>{session.venueAddress.venueName || ''}</NormalText>*/}
                        <NormalText numberOfLines={2}>{session.venueAddress.streetAddress}</NormalText>
                    </View>
                </View>
                <View style={{flexDirection:'row', alignItems:'center', marginTop:5}}>
                    <View style={{height:'80%', width:3, borderRadius:5, backgroundColor:colors.yellow, marginRight:10}}/>
                    <NormalText>{moment(session.sessionDate).format('LT')} - {moment(session.sessionDate).second(60*session.sessionDuration).format('LT')}</NormalText>
                </View>
            </View>
        </View>
    )
}