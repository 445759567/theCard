import React from 'react';
import {Image, View} from "react-native";
import {connect} from "react-redux";
import NormalText from "./normalText";
import PlaceSkeleton from "./placeSkeleton";
import {DateInfo, FloatInfo} from "./SlidingEvents";
import ShadowCard from "./ShadowCard";
import LoadingAndRefresh from "./loadingAndRefresh";
import {colors, windowHeight} from "../globalVariables";
import {wpDataPreprocess} from "../functions";
import {DealIcon} from "./DealIcon";
import ViewMore from "./ViewMore";
import {WikiSubtitle} from "./WikiSubtitle";

const styles = {
    title:{
        fontSize:20
    },
    latestNewsImage:{
        width:'100%', height:'100%',
        // borderRadius:10
    },
    categoryModalItem:{
        // borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:colors.white,
    }
}
function RecommendedList({onViewMore, onItemPress, onRefresh, list, listLoading, listLoadingFailed, titleColor, typeCategoryList, deal, hideLocation, ...props}) {
    const onPlacePress = (place) =>{
        onItemPress(place)
    }
    return (
        <View style={{marginTop:15, width:'100%'}}>
            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:10}}>
                {/*<TitleText style={styles.title}>{props.wording.Recommended}</TitleText>*/}
                <WikiSubtitle>{props.wording.Recommended}</WikiSubtitle>
                <ViewMore onPress={onViewMore}/>
            </View>
            {
                listLoading?
                    <View style={{flexDirection:'row', height:windowHeight*0.25}}>
                        <ShadowCard style={[styles.categoryModalItem, {height:'100%', width:'40%'}]}>
                            <PlaceSkeleton/>
                        </ShadowCard>
                        <View style={{flex:1, justifyContent:'space-between', marginLeft:10}}>
                            {
                                [0,1].map((item, index)=>{
                                    return(
                                        <ShadowCard key={index} style={[styles.categoryModalItem, {height:'47%', width:'100%'}]}>
                                            <PlaceSkeleton/>
                                        </ShadowCard>
                                    )
                                })
                            }
                        </View>
                    </View>:
                    listLoadingFailed?
                        <View style={{height:windowHeight*0.2, justifyContent:'center', width:'100%'}}>
                            <LoadingAndRefresh onRefreshPress={onRefresh}/>
                        </View>:
                        list.data.length < 1?
                            <View style={{height:windowHeight*0.2, justifyContent:'center'}}>
                                <NormalText style={{margin:20}}>Sorry, we can't find any item now. More events are coming soon</NormalText>
                            </View>:
                            <View style={{flexDirection:'row', height:windowHeight*0.25}}>
                                <ShadowCard onPress={()=>onPlacePress(list.data[0])} style={[styles.categoryModalItem, {height:'100%', width:'40%'}]}>
                                    <Image source={{uri: wpDataPreprocess.getCoverImg(list.data[0].cover[0].medium)}} style={[styles.latestNewsImage]}/>
                                    <FloatInfo place={list.data[0]} hideLocation={hideLocation} borderR={0} titleFontSize={12} titleNumberOfLines={3} subTitleFontSize={11} typeCategoryList={typeCategoryList}/>
                                    {
                                        deal?
                                            <DealIcon dealNumber={list.data[0].dealNumber} style={{position:'absolute', top:0, right:0}}/>:
                                            <DateInfo date={list.data[0].date}/>
                                    }
                                </ShadowCard>
                                <View style={{flex:1, justifyContent:'space-between', marginLeft:2}}>
                                    {
                                        list.data.slice(1,3).map((item, index)=>{
                                            return(
                                                <ShadowCard onPress={()=>onPlacePress(list.data[index+1])} key={index} style={[styles.categoryModalItem, {height:'49.5%', width:'100%'}]}>
                                                    <Image source={{uri: wpDataPreprocess.getCoverImg(list.data[index+1].cover[0].medium)}} style={styles.latestNewsImage}/>
                                                    <FloatInfo hideLocation={hideLocation} place={list.data[index+1]} borderR={0} titleFontSize={12} subTitleFontSize={11} typeCategoryList={typeCategoryList} titleNumberOfLines={hideLocation?2:1}/>
                                                    {
                                                        deal?
                                                            <DealIcon dealNumber={item.deals} style={{position:'absolute', top:0, right:0}}/>:
                                                            <DateInfo date={item.date}/>
                                                    }
                                                </ShadowCard>
                                            )
                                        })
                                    }
                                </View>
                            </View>
            }
        </View>
    );
}
const mapState = (state) => {
    return{
        parentId: state.account.parentId,
        wording: state.account.wording,
    }
}
// const mapDispatch = (dispatch) => {
//     return {
//         // setPlaceChosen(res){
//         //     const action = setPlaceChosenAction(res)
//         //     dispatch(action)
//         // },
//     }
// }
export default connect(mapState, null)(RecommendedList);