import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import {connect} from "react-redux";
import {colors, windowWidth} from "../globalVariables";
import moment from "moment";
import {wpDataPreprocess} from "../functions";
import NormalText from "./normalText";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const styles = StyleSheet.create({
    lightMode:{
        marginLeft:10
    },
})
const handleHour = (hour) =>{
    let result = {}
    switch (hour.status) {
        case 'enter-hours':
            result.open = (moment().isBetween(hour.fromTime, hour.toTime))
            result.text = `${moment(hour.fromTime).format('LT')} - ${moment(hour.toTime).format('LT')}`
            break
        case 'closed-all-day':
            result.open = false
            result.text = 'close all day'
            break
        case 'open-all-day':
            result.open = true
            result.text = 'open all day'
            break
        case 'by-appointment-only':
            result.open = null
            result.text = 'by appointment'
            break
        default:
            result.open = true
            result.text = 'open All day'
            break
    }
    return result
}
const Expand = ({hours}) =>{
    return(
        <View>
            {
                hours.slice(1).map((item, index)=>{
                    // console.log(item)
                    if(!item){
                        return(
                            <View key={index}/>
                        )
                    }
                    let day = moment().day()
                    return(
                        <View style={{flexDirection:'row'}} key={index}>
                            <NormalText style={{width:windowWidth*0.3}} font={day===index+1?'bold':'regular'}>{moment().day(index+1).format('ddd')}</NormalText>
                            <NormalText font={day===index+1?'bold':'regular'}>{handleHour(item).text}</NormalText>
                        </View>
                    )
                })
            }
        </View>
    )
}
const NotExpand = ({hours}) =>{
    if(!hours){
        return(
            <View/>
        )
    }
    const result = handleHour(hours)
    return(
        <View>
            <NormalText><NormalText style={{color:result.open?colors.green:colors.warnOrange}}>{result.open===true? 'Open': result.open===false? 'Closed':null}</NormalText> - {result.text}</NormalText>
        </View>
    )
}
function WorkHours ({workHours, ...props}) {
    const [expand, setExpand] = useState(false)
    const hours = wpDataPreprocess.getWorkHours(workHours)
    const today = hours[moment().day()]
    const hideAll = () =>{
        setExpand(false)
    }
    const showAll = () =>{
        setExpand(true)
    }
    return (
        <View>
            <View style={{flexDirection:'row'}}>
                <MaterialCommunityIcons name="clock-time-seven-outline" size={24} color={colors.black}  style={{width:30}}/>
                <TouchableOpacity style={[styles.lightMode, props.style]} onPress={()=>setExpand(!expand)}>
                    <NormalText>{hours[0]} Time</NormalText>
                    {
                        expand?
                            <Expand onPress={hideAll} hours={hours}/>:
                            <NotExpand onPress={showAll} hours={today}/>
                    }
                </TouchableOpacity>
                {
                    !expand &&
                    <MaterialCommunityIcons name="chevron-down" size={24} color={colors.black}  style={{width:30}}/>
                }

            </View>
        </View>
    );
}
const mapState = (state) => {
    return{
        darkMode: state.account.darkMode
    }
}

export default connect(mapState, null)(WorkHours)