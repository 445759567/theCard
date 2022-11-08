import React from "react";
import {Skeleton} from "@rneui/base";
import {colors} from "../globalVariables";
import {View} from 'react-native'

export default function IKidzSkeleton({width, height, ...props}) {
    return (
        <Skeleton width={width} height={height}
                  // skeletonStyle={{backgroundColor:colors.lightgrey}} theme={{colors:colors.red}} style={{backgroundColor:colors.grey}}
                  // LinearGradientComponent={()=> {
                  //     return <View style={{backgroundColor: colors.red}}/>
                  // }}
                  {...props}/>
    );
}