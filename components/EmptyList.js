import {View} from "react-native";
import {EventSkeleton, IKidzButton, NormalText} from "./index";
import { windowWidth} from "../globalVariables";
import React from "react";
import IKidzSkeleton from "./skeleton";

export const EmptyList = ({loading, loadingFailed, listLength, onRefresh, column, circle}) =>{
    if(loading){    //loading
        if(circle){
            return(
                <View style={{width:'100%', alignItems:'center', flexDirection:'row'}}>
                    <IKidzSkeleton circle width={windowWidth*0.16} height={windowWidth*0.16} style={{marginHorizontal:8}}/>
                    <IKidzSkeleton circle width={windowWidth*0.16} height={windowWidth*0.16}/>
                </View>
            )
        }else{
            return(
                <View style={{width:'100%', alignItems:'center', flexDirection:column?'column':'row'}}>
                    <EventSkeleton style={{width:'90%', minWidth:windowWidth*0.8, marginHorizontal:column?5:10, marginVertical:column?10:5}}/>
                    <EventSkeleton style={{width:'90%', marginHorizontal:column?0:10, marginVertical:column?10:0}}/>
                </View>
            )
        }
    }else if(!loading && loadingFailed){    //loading failed
        return(
            <View style={{ alignItems:'center', padding:10, justifyContent:'center', maxWidth:windowWidth*0.8, alignSelf:'center'}}>
                <NormalText font={'medium'} fontSize={14}>Something's up with the connection</NormalText>
                <NormalText font={'lighter'} style={{marginVertical:10}}>Check your device's connection and try refreshing</NormalText>
                <IKidzButton title={'Refresh'} onPress={onRefresh} style={{marginTop:20}}/>
            </View>
        )
    }else if(!loading && !loadingFailed && listLength === 0){  //get no result
        return(
            <View style={{margin:20, maxWidth:windowWidth*0.8}}>
                <NormalText>No items were found. Please try other selection criteria.</NormalText>
            </View>
        )
    }else{
        return(<View/>)
    }
}