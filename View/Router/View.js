import React, {useEffect, useState} from 'react';
import {View} from "react-native";
import {connect} from "react-redux";
import {NormalText} from "../../components";
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabRouter from "../BottomTabRouter/View";
import {colors} from "../../globalVariables";

const Stack = createStackNavigator()
function Router({...props}) {

    const BottomTabStack = () =>{
        return(
            <Stack.Screen
                name="Home"
                options={({navigation})=>({
                    title: '',
                    headerStyle:{backgroundColor: colors.yellow, height:0},
                })}
                children={(props) => (
                    <BottomTabRouter
                        // onLogin={onLogin}
                        // getBookmarks={getBookmarks}
                        // setDeviceToken={setDeviceToken}
                        {...props}
                    />
                )}
            />
        )
    }
    return (
        <View style={{flex:1}}>
            {/*<NormalText>123</NormalText>*/}
            <Stack.Navigator>
                {BottomTabStack()}
            </Stack.Navigator>
        </View>
    );
}

const mapState = (state) => {
    return {
        //signIn: state.account.signIn,
    }
}
const mapDispatch = (dispatch) => {
    return {
        // setCompanyId(res){
        //     const action = setCompanyIdAction(res)
        //     dispatch(action)
        // },
    }
}
export default connect(mapState, mapDispatch)(Router);