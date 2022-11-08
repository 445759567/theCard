import React, {useState} from 'react';
import {Image, ImageBackground, Modal, Pressable, ScrollView, TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";
import NormalText from "./normalText";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {colors, windowHeight, windowWidth} from "../globalVariables";
import {normalizeIconSize} from "../functions/sizeNormalize";
import {Subtitle} from "../View/LearningDetail/Subtitle";
// import {ReviewItemContent} from "../View/MerchantDetail/Reviews";
import {ReviewItemContent} from "./Reviews";
import {InstructorItemContent} from "../View/LearningDetail/Instructor";
import {configFunctions, wpDataPreprocess} from "../functions";
import ShadowCard from "./ShadowCard";
import iconDealsAvailable from '../assets/icons/DealsAvailable.png'
import moment from "moment";
import * as Clipboard from 'expo-clipboard';
import {setFloatMessageAction, setShowFloatMessageAction} from "../View/home/actionCreator";
import {useNavigation} from "@react-navigation/native";
import {setBookmarksAction} from "../View/signInControl/actionCreator";
import {wpBase} from "../APIs/apiUrls";

const checkDealHasCode = (deal) =>{
    return deal.dealCode && deal.dealCode.length > 0
}
const DealItemDetail = ({onHide, deal, logo, onCopyPress, onBookmarkPress, bookmarks}) =>{
    const borderRadius = 20
    const logoSize = normalizeIconSize(38)
    const iconSize = normalizeIconSize(25)
    const onShare = () =>{
        console.log(bookmarks)
        configFunctions.onShare(wpBase+'/listing/deal/' + deal.slug)
    }
    console.log(deal)
    const DealDetailLine = ({text}) =>{
        const deals = text.split('\r\n\r\n')
        return(
            <View style={{marginVertical:20}}>
                {deals.map((item, index)=>{
                    return(
                        <View style={{flexDirection:'row', alignItems:'flex-start', marginBottom:5}} key={index}>
                            <MaterialCommunityIcons name="check" size={normalizeIconSize(16)} color={colors.yellow} style={{marginTop:2, marginRight:10}} />
                            <NormalText style={{color:colors.white}}>{item}</NormalText>
                        </View>
                    )
                })}
            </View>
        )
    }
    return(
        <Pressable style={{flex:1, backgroundColor:colors.opacityGrey, alignItems:'center', justifyContent:'center'}} onPress={onHide}>
            <View style={{height:'80%', width:'90%', borderRadius:20, backgroundColor:colors.yellow}}>
                <ImageBackground  style={{flex:1}} source={deal.cover.length < 1?iconDealsAvailable:{uri:deal.cover[0].medium}} imageStyle={{borderRadius:checkDealHasCode(deal)?0:borderRadius, borderTopRightRadius:borderRadius, borderTopLeftRadius:borderRadius}}>
                    <View style={{flex:1, backgroundColor:colors.opacityGrey, padding:30, borderTopRightRadius:borderRadius, borderTopLeftRadius:borderRadius}}>
                        <View style={{width:'100%', alignItems:'flex-end', padding:0}}>
                            <Pressable onPress={onHide}>
                                <NormalText style={{color:colors.grey1}}>CLOSE [x]</NormalText>
                            </Pressable>
                        </View>
                        <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between', marginVertical:10, alignItems:'center'}}>
                            {
                                logo?
                                    <ShadowCard style={{backgroundColor:colors.white, borderRadius:100, width:logoSize, height:logoSize}}>
                                        <Image source={{uri:logo}} style={{width:'100%', height:'100%', borderRadius:100}}/>
                                    </ShadowCard>:<View/>
                            }
                            <View style={{flexDirection:'row'}}>
                                <Pressable style={{marginRight:10}} onPress={onShare}>
                                    <MaterialCommunityIcons name={'share-variant'} size={iconSize} color={colors.white}/>
                                </Pressable>
                                <Pressable onPress={onBookmarkPress}>
                                    {
                                        wpDataPreprocess.checkActivityIsFavorite(deal.ID, bookmarks)?
                                            <MaterialCommunityIcons name={'bookmark'} size={iconSize} color={colors.yellow}/>:
                                            <MaterialCommunityIcons name={'bookmark-outline'} size={iconSize} color={colors.white}/>
                                    }
                                </Pressable>
                            </View>
                        </View>
                        <NormalText style={{color:colors.white,  marginTop:10}} font={'bold'} fontSize={16} numberOfLines={2}>{deal.name}</NormalText>
                        <View style={{flexDirection:'row'}}>
                            {
                                deal.verified.indexOf('Yes') > -1?
                                    <View style={{flexDirection:'row', alignItems:'center', backgroundColor:colors.yellow, padding:5, marginVertical:20, paddingHorizontal:10, borderRadius:10}}>
                                        <MaterialCommunityIcons name="marker-check" size={normalizeIconSize(16)} color={colors.black} />
                                        <NormalText style={{marginLeft:5}} font={'bold'} fontSize={10}>Verified</NormalText>
                                    </View>:<View style={{flex:1}}/>
                            }
                        </View>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <MaterialCommunityIcons name="alarm" size={normalizeIconSize(16)} color={colors.yellow} />
                            <NormalText style={{color:colors.white, marginLeft:10}}>Expire: {(!deal.end || deal.end.length < 1)? 'until activity provider\'s further notice':moment(deal.end).format('DD MMM YYYY')}</NormalText>
                        </View>
                        <DealDetailLine text={deal.dealDetail}/>
                        {
                            checkDealHasCode(deal)?
                                <View style={{flex:1, justifyContent:'flex-end', marginBottom:30, alignItems:'center'}}>
                                    <NormalText style={{color:colors.white, marginBottom:10}} font={'lighter'}>DISCOUNT CODE</NormalText>
                                    <View style={{borderWidth:1, borderColor:colors.white, padding:5, width:'80%', borderRadius:10, alignItems:'center', justifyContent:'center'}}>
                                        <NormalText style={{color:colors.white}} font={'medium'} fontSize={18}>{deal.dealCode}</NormalText>
                                    </View>
                                </View>:null
                        }
                    </View>
                </ImageBackground>
                {
                    checkDealHasCode(deal)?
                        <Pressable style={{paddingVertical:20, width:'100%', alignItems:'center'}} onPress={onCopyPress}>
                            <NormalText font={'bold'} fontSize={20}>COPY CODE</NormalText>
                        </Pressable>:null
                }
            </View>
        </Pressable>
    )
}
const _DealItem = ({deal, style, showFloatMessage, logo, onHideDealList, ...props}) =>{
    const navigation=useNavigation()
    const [showModal, setShowModal] = useState(false)
    const logoSize = normalizeIconSize(70)
    const onHideModal = () =>{
        setShowModal(false)
    }
    const onShowModal = () =>{
        console.log(deal)
        if(moment().isBefore(moment(deal.end)) || !deal.end){
            setShowModal(true)
        }
    }
    const onWebsitePress = () =>{
        configFunctions.onWeblinkPress(deal.dealWebLink)
    }
    const onBookmarkPress = () =>{
        if(!props.signIn){
            onHideModal()
            if(onHideDealList){
                onHideDealList()
            }
        }
        wpDataPreprocess.onBookmarkPress(props.bookmarks, deal.ID || deal.id, props.setBookmarks, navigation, props.parentId)
    }
    const onCopyPress = async () =>{
        try {
            await Clipboard.setString(deal.dealCode)
            showFloatMessage('Code is Copied')
        }catch (e) {
            console.log(e)
        }
    }
    const width = windowWidth*0.75
    // const height = width/2
    return(
        <ShadowCard elevation={2} style={[{marginVertical:10, borderRadius:10, backgroundColor:colors.white, width:width, opacity:moment().isBefore(moment(deal.end))?1:deal.end?0.5:1}, style]} onPress={onShowModal}>
            {/*<ImageBackground  source={imageTicket} resizeMode="cover" style={{width:'100%', height:'100%'}} imageStyle={{borderRadius:10}}>*/}
            {/*    <View style={{marginLeft:40, marginRight:20, justifyContent:'space-between'}}>*/}
            {/*        <View style={{flexDirection:'row', alignItems:'center', marginVertical:10, height:'45%'}}>*/}
            {/*            {*/}
            {/*                logo?*/}
            {/*                    <ShadowCard style={{backgroundColor:colors.white, marginHorizontal:10, borderRadius:100, width:logoSize, height:logoSize}}>*/}
            {/*                        <Image source={{uri:logo}} style={{width:'100%', height:'100%', borderRadius:100}}/>*/}
            {/*                    </ShadowCard>:null*/}
            {/*            }*/}
            {/*            <NormalText font={'bold'} fontSize={12} numberOfLines={2} style={{marginRight:30, flex:1}}>{deal.name}</NormalText>*/}
            {/*        </View>*/}
            {/*        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'flex-end', width:'100%', borderRadius:20, marginLeft:10}}>*/}
            {/*            {*/}
            {/*                deal.end ?*/}
            {/*                    <View style={{marginLeft:5}}>*/}
            {/*                        <NormalText style={{color:colors.grey}}>Expires</NormalText>*/}
            {/*                        <NormalText style={{marginLeft:0}} font={'bold'} fontSize={12}>{deal.end.length < 1? 'While stock last':moment(deal.end).format('DD MMM YYYY')}</NormalText>*/}
            {/*                    </View>:<View/>*/}
            {/*            }*/}
            {/*            <View>*/}
            {/*                <ShadowCard style={{flexDirection:'row', backgroundColor:colors.yellow, padding:5, alignItems:'center', borderRadius:5}}>*/}
            {/*                    <NormalText fontSize={10} style={{maxWidth:80}} numberOfLines={1} adjustsFontSizeToFit={true}>DEAL CODE </NormalText>*/}
            {/*                    <TouchableOpacity style={{backgroundColor:colors.white, borderRadius:5, paddingHorizontal:5, marginLeft:3}} onPress={onCopyPress}>*/}
            {/*                        <NormalText fontSize={10}>COPY</NormalText>*/}
            {/*                    </TouchableOpacity>*/}
            {/*                </ShadowCard>*/}
            {/*            </View>*/}
            {/*        </View>*/}
            {/*    </View>*/}
            {/*</ImageBackground>*/}
            <View style={{marginVertical:10, padding:10, paddingHorizontal:20, flex:1}}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <View style={{width:'50%'}}>

                        <NormalText numberOfLines={1} font={'bold'} fontSize={19} style={{}}>{deal.name.split(' ').slice(0,2).join(' ')}</NormalText>
                        <NormalText numberOfLines={2} style={{color:colors.grey}} fontSize={12}>{deal.name.split(' ').slice(2).join(' ')}</NormalText>
                        <NormalText font={'lighter'} fontSize={9} style={{color:colors.grey, marginTop:5}}>Expires: {deal.end?moment(deal.end).format('DD MMM YYYY'):"until activity provider's further notice"}</NormalText>

                    </View>

                    {
                        logo?
                            <ShadowCard style={{backgroundColor:colors.white, marginHorizontal:0, borderRadius:100, width:logoSize, height:logoSize}}>
                                <Image source={{uri:logo}} style={{width:'100%', height:'100%', borderRadius:100}}/>
                            </ShadowCard>:null
                    }
                </View>
                {/*<NormalText font={'lighter'} fontSize={12} style={{width:'70%'}} numberOfLines={2}>{deal.dealDetail}</NormalText>*/}
            </View>
            <ShadowCard style={{flexDirection:'row', justifyContent:'center', backgroundColor:colors.yellow, padding:10, alignItems:'center', borderBottomLeftRadius:10, borderBottomRightRadius:10}} onPress={checkDealHasCode(deal)?onCopyPress:onWebsitePress}>
                <NormalText>{checkDealHasCode(deal)?'COPY CODE':'Redeem Now'}</NormalText>
            </ShadowCard>
            <Modal
                animationType={'fade'}
                onRequestClose={onHideModal}
                visible={showModal}
                transparent
            >
                <DealItemDetail onHide={onHideModal} deal={deal} logo={logo} onCopyPress={onCopyPress} onBookmarkPress={onBookmarkPress} bookmarks={props.bookmarks}/>
            </Modal>
        </ShadowCard>
    )
}
const Deals = ({passedParams, showFloatMessage, onHideDealList}) =>{
    let logo = null
    if(passedParams.merchant && passedParams.merchant.logo){
        logo = passedParams.merchant.logo[0]?.thumbnail??null
    }else if(passedParams.logo){
        logo = passedParams.logo[0]?.thumbnail??null
    }
    return(
        <ScrollView style={{backgroundColor:colors.white, padding:20, paddingVertical:10, maxHeight:windowHeight*0.7}}>
            <Subtitle text={'Deals'}/>
            {
                passedParams.deals.map((item, index)=>{
                    return(
                        <DealItem deal={item} key={index} showFloatMessage={showFloatMessage} logo={logo} onHideDealList={onHideDealList}/>
                    )
                })
            }
        </ScrollView>
    )
}
const Conditions = ({conditions}) =>{
    return(
        <View style={{backgroundColor:colors.white, padding:20, paddingVertical:10}}>
            <Subtitle text={'Terms & Conditions'}/>
            <NormalText>{conditions}</NormalText>
        </View>
    )
}
const Review = ({review}) =>{
    return(
        <ScrollView style={{backgroundColor:colors.white, padding:20, paddingVertical:10}}>
            <Subtitle text={'Review'}/>
            <View style={{flex:1}}>
                <ReviewItemContent item={review} lines={100}/>
            </View>
        </ScrollView>
    )
}
const Instructor = ({instructor}) =>{
    return(
        <ScrollView style={{backgroundColor:colors.white, padding:20, paddingVertical:10, maxHeight:windowHeight*0.7}} showsVerticalScrollIndicator={false}>
            {/*<Subtitle text={'Review'}/>*/}
            <View style={{flex:1}}>
                <InstructorItemContent item={instructor} lines={100}/>
            </View>
        </ScrollView>
    )
}
function DetailModal({onHide, type, passedParams, review, AdditionalFields, instructor, ...props}) {
    const merchant = passedParams.merchant  || passedParams
    const showFloatMessage = (message) =>{
        props.setShowFloatMessage(true)
        props.setFloatMessage(message)
    }
    return(
        <Pressable style={{width:windowWidth, height:'100%', alignItems:'center', justifyContent:'center', padding:20, backgroundColor:colors.opacityHalfGrey}} onPress={onHide}>
            <Pressable style={{width:'100%', backgroundColor:colors.white, borderRadius:20, paddingBottom:20}}>
                <View style={{alignItems:'flex-end'}}>
                    <TouchableOpacity onPress={onHide} style={{marginRight:10, marginTop:10}}>
                        <MaterialCommunityIcons name={'close'} size={normalizeIconSize(12)} color={colors.black}/>
                    </TouchableOpacity>
                </View>
                {
                    type==='contact'?
                        <AdditionalFields event={merchant}/>:
                        type==='deals'?
                            <Deals passedParams={passedParams} showFloatMessage={showFloatMessage} onHideDealList={onHide}/>:
                            type==='conditions'?
                                <Conditions conditions={merchant.conditions}/>:
                                type==='reviews'?
                                    <Review review={review}/>:
                                    type==='instructors'?
                                        <Instructor instructor={instructor}/>:null

                }
            </Pressable>
        </Pressable>
    )
}
const mapState = (state) => {
    return{
        signIn: state.account.signIn,
        bookmarks: state.account.bookmarks,
        parentId: state.account.parentId,
        wording: state.account.wording,
    }
}
const mapDispatch = (dispatch) => {
    return {
        setShowFloatMessage(res){
            const action = setShowFloatMessageAction(res)
            dispatch(action)
        },
        setFloatMessage(res){
            const action = setFloatMessageAction(res)
            dispatch(action)
        },
        setBookmarks(res){
            const action = setBookmarksAction(res)
            dispatch(action)
        },
    }
}
export default connect(mapState, mapDispatch)(DetailModal);
export const DealItem = connect(mapState, mapDispatch)(_DealItem);