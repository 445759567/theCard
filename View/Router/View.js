import React, {useEffect, useState} from 'react';
import {View} from "react-native";
import {connect} from "react-redux";
import {NormalText} from "../../components";
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabRouter from "../BottomTabRouter/View";
import {colors} from "../../globalVariables";
import Login from "../Login/View";
import SignUp from "../Login/SignUp";

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
                        {...props}
                    />
                )}
            />
        )
    }
    const LoginStack = () =>{
        return(
            <Stack.Screen
                name="login"
                options={({navigation})=>({
                    title: 'Sign In',
                    headerStyle:{backgroundColor: colors.yellow},
                })}
                children={(props) => (
                    <Login
                        {...props}
                    />
                )}
            />
        )
    }
    const SignUpStack = () =>{
        return(
            <Stack.Screen
                name="signUp"
                options={({navigation})=>({
                    title: 'Sign Up',
                    headerStyle:{backgroundColor: colors.yellow},
                })}
                children={(props) => (
                    <SignUp
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
                {LoginStack()}
                {SignUpStack()}
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