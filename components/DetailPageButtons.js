import {TouchableOpacity, View} from "react-native";
import React from "react";
import {colors} from "../globalVariables";
import NormalText from "./normalText";


export const DetailPageButtons = ({icons, labels, onButton1Press, onButton2Press, onButton3Press, onButton4Press}) =>{
    const borderColor = '#ecebeb'
    const onButtonPress = (index) =>{
        switch (index) {
            case 0:
                onButton1Press()
                return
            case 1:
                onButton2Press()
                return
            case 2:
                onButton3Press()
                return
            case 3:
                onButton4Press()
                return
        }
    }
    return(
        <View style={{marginTop:10, flexDirection:'row', justifyContent:'space-between', backgroundColor:colors.lightgrey, borderWidth:1, borderColor:borderColor}}>
            {
                icons.map((item, index)=>{
                    return(
                        <TouchableOpacity disabled={item.disable} onPress={()=>onButtonPress(index)} key={index} style={{alignItems:'center', opacity:item.disable?0.5:1, padding:10, borderLeftWidth:index===0?0:1, borderColor:borderColor, width:'25%'}}>
                            <View style={{flex:1, justifyContent:'center'}}>
                                {item.icon}
                            </View>
                            <NormalText style={{textAlign:'center'}} font={'lighter'} fontSize={11} numberOfLines={1} adjustsFontSizeToFit={true}>{labels[index]}</NormalText>
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}