import React, {useEffect, useRef, useState, useMemo} from 'react';
import {Animated, Image, Pressable, View} from "react-native";
import {connect} from "react-redux";
import NormalText from "./normalText";
import PlaceSkeleton from "./placeSkeleton";
import PagerView from "react-native-pager-view";
import {colors, imageRadio, windowHeight, windowWidth} from "../globalVariables";
import {ScalingDot} from 'react-native-animated-pagination-dots';
import {wpDataPreprocess} from "../functions";
import LinearGradient from "./LinearGradient";
import LoadingAndRefresh from "./loadingAndRefresh";
import moment from "moment";
import {Avatar} from "./Avatar";
import {normalizeIconSize} from "../functions/sizeNormalize";
import iconPin from '../assets/icons/pinWhite.png'


const styles = {
    latestNewsImage:{
        width:'100%', height:'100%', borderRadius:10
    },
}
export const FloatInfo = ({place, borderR, typeCategoryList, categories, titleFontSize, titleNumberOfLines, subTitleFontSize, tagline, language, hideLocation}) =>{
    const [icons, setIcons] = useState([])
    const borderRadius = borderR===undefined ? 10: borderR
    useEffect(()=>{
        if(typeCategoryList && typeCategoryList.length > 0){
            setIcons(getCategoryIcons())
        }
    },[typeCategoryList])
    if(!place){
        return (
            <View/>
        )
    }
    const getCategoryIcons = () =>{
        let result = []
        place.category.map(category =>{
            result.push(typeCategoryList.filter(item => item.description === category)[0])
        })
        return(result)
    }
    const iconHeight = normalizeIconSize(11)
    return(
        <View style={{position:'absolute', bottom:0, left:0, width:'100%', zIndex:3}}>
            <LinearGradient colors={['transparent', '#000000']} style={{padding:10, width:'100%', borderRadius:borderRadius}}>
                <NormalText font={'bold'} style={{color:colors.white}} fontSize={titleFontSize || 14} numberOfLines={titleNumberOfLines || 2}>{place.companyName?place.companyName:place.name}</NormalText>
                {
                    (tagline && language)?
                        <NormalText numberOfLines={2} style={{color:colors.opacityWhite}} font={'lighter'} fontSize={12}>{tagline[language]}</NormalText>:
                        hideLocation?null:
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                {/*{wpDataPreprocess.getCategoryIcon({icon:'mci map_marker', color:colors.white}, 16)}*/}
                                <Image source={iconPin} style={{height:iconHeight, width:iconHeight*0.8, marginRight:5}}/>
                                <NormalText style={{color:colors.white, flex:1}} fontSize={subTitleFontSize || 12} numberOfLines={1}>{place.region? wpDataPreprocess.removeSymbols(place.region[0]) : place.location? place.location.split(',')[0]:''}</NormalText>
                            </View>
                }
                {/*<NormalText style={{color:colors.white, fontSize:13}}>{place.distance.toFixed(2)} km</NormalText>*/}
            </LinearGradient>
        </View>
    )
}

export const DateInfo = ({date}) =>{
    if(!date) return(<View/>)
    const {start, end} = wpDataPreprocess.getDateRange(date)
    const startText = moment(start).format('MMM DD')
    const endText = moment(end).format('MMM DD')

    const dateStyle = {
        month:{
            width:'100%', backgroundColor:colors.warnOrange, padding:1, paddingHorizontal:10, borderTopLeftRadius:10, borderTopRightRadius:10,

        }
    }
    return(
        <View style={{position:'absolute', top:10, right:10, zIndex:2, flexDirection:'row', backgroundColor: colors.opacityHalfGrey, borderRadius: 10}}>
            {
                startText === endText?
                    <NormalText style={{color:colors.white, marginHorizontal:5}} fontSize={12}>
                        {moment(start).format('MMM')}<NormalText fontSize={12} style={{color:colors.white}} font={'bold'}> {moment(start).format('DD')}</NormalText>
                    </NormalText>:
                    <NormalText style={{color:colors.white, marginHorizontal:5}} fontSize={12}>
                        {moment(start).format('MMM')}<NormalText fontSize={12} style={{color:colors.white}} font={'bold'}> {moment(start).format('DD')}</NormalText> - {moment(end).format('MMM')}<NormalText fontSize={12} style={{color:colors.white}} font={'bold'}> {moment(end).format('DD')} </NormalText>
                    </NormalText>
            }
        </View>
    )
}

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);
function SlidingEvents({onRefresh, onPlacePress, list, listLoading, listLoadingFailed, typeCategoryList, logo, tagline, ...props}) {
    const [imageIndex, setImageIndex] = useState(0)
    const pagerRef = useRef()
    const scrollOffsetAnimatedValue = React.useRef(new Animated.Value(0)).current;
    const positionAnimatedValue = React.useRef(new Animated.Value(0)).current;
    // console.warn(list)
    const inputRange = [0, list.data.length];
    const onImageScroll = (event) =>{
        setImageIndex(event.nativeEvent.position)
    }
    useEffect(()=>{
        if(!list.empty){
            let timer = setTimeout(() => {
                if(imageIndex===list.data.length-1){
                    setImageIndex(0)
                    pagerRef.current?.setPage(0)
                }else{
                    setImageIndex(imageIndex+1)
                    pagerRef.current?.setPage(imageIndex+1)
                }
            }, 5000)
            return () => {
                clearTimeout(timer)
            }
        }
    },[imageIndex])
    const onPageScroll = useMemo(() =>
            Animated.event(
                [
                    {
                        nativeEvent: {
                            offset: scrollOffsetAnimatedValue,
                            position: positionAnimatedValue,
                        },
                    },
                ],
                {
                    useNativeDriver: false,
                }
            ),
        [])
    if(list.empty){
        return(
            <View style={{height:windowHeight*0.2, justifyContent:'center'}}>
                <NormalText>Sorry, we can't find any item now. More events are coming soon</NormalText>
            </View>
        )
    }

    const scrollX = Animated.add(
        scrollOffsetAnimatedValue,
        positionAnimatedValue
    ).interpolate({
        inputRange,
        outputRange: [0, list.data.length * windowWidth],
    });
    return (
        <View style={{width:'100%'}}>
            {
                listLoading?
                    <View style={{width:'100%', aspectRatio:imageRadio, marginBottom:20}}>
                        <PlaceSkeleton/>
                    </View>:
                    listLoadingFailed?
                        <View style={{height:windowHeight*0.2, justifyContent:'center', width:'100%'}}>
                            <LoadingAndRefresh onRefreshPress={onRefresh}/>
                        </View>:
                        list.data.length < 1?
                            <View style={{height:windowHeight*0.2, justifyContent:'center'}}>
                                <NormalText style={{margin:20}}>Sorry, we can't find any item now. More events are coming soon</NormalText>
                            </View>:
                            <View>
                                <View style={{paddingBottom:20}}>
                                    <AnimatedPagerView
                                        style={{width: '100%', aspectRatio: imageRadio}}
                                        ref={pagerRef}
                                        onPageSelected={onImageScroll}
                                        pageMargin={10}
                                        onPageScroll={onPageScroll}
                                        // transitionStyle={'curl'}
                                        initialPage={0}
                                    >
                                        {
                                            list.data.map((item, index)=>{
                                                return(
                                                    <Pressable key={index} onPress={()=>onPlacePress(item)}>
                                                        <Image source={{uri: wpDataPreprocess.getCoverImg(item.cover[0]?.medium??null)}} style={styles.latestNewsImage}/>
                                                        <FloatInfo place={item} typeCategoryList={typeCategoryList} tagline={tagline?item.shortDesc:null} language={props.wording.l639_1}/>
                                                        {
                                                            logo?
                                                                <Avatar size={windowWidth*0.16} uri={item.merchant? item.merchant.logo[0].medium : item.logo[0].medium}/>:
                                                                <DateInfo date={item.date}/>
                                                        }
                                                    </Pressable>
                                                )
                                            })
                                        }
                                    </AnimatedPagerView>
                                </View>
                                <View style={{flex:1}}>

                                    {/*<SlidingDot*/}
                                    {/*    marginHorizontal={3}*/}
                                    {/*    containerStyle={{ bottom: 5}}*/}
                                    {/*    data={list.data}*/}
                                    {/*    scrollX={scrollX}*/}
                                    {/*    dotSize={12}*/}
                                    {/*/>*/}
                                    <ScalingDot
                                        data={list.data}
                                        scrollX={scrollX}
                                        activeDotColor={colors.yellow}
                                        inActiveDotColor={colors.opacityWhite}
                                        inActiveDotOpacity={1}
                                        containerStyle={{bottom:30}}
                                        dotStyle={{backgroundColor:colors.holidayGreen, color:colors.holidayGreen, height:5}}
                                    />
                                </View>
                            </View>
            }
            {/*<NormalText>{props.parentId}</NormalText>*/}
        </View>
    );
}
const mapState = (state) => {
    return{
        signIn: state.account.signIn,
        parentId: state.account.parentId,
        wording: state.account.wording,
    }
}
const mapDispatch = (dispatch) => {
    return {
        // setPlaceChosen(res){
        //     const action = setPlaceChosenAction(res)
        //     dispatch(action)
        // },
    }
}
export default connect(mapState, mapDispatch)(SlidingEvents);