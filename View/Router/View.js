import React, {useEffect} from 'react';
import {View} from "react-native";
import {connect} from "react-redux";
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabRouter from "../BottomTabRouter/View";
import {colors} from "../../globalVariables";
import Login from "../Login/View";
import SignUp from "../Login/SignUp";
import EditUserInfo from "../UCenter/EditUserInfo";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {setUserAction, setUserIDAction} from "../UCenter/actionCreator";
import CardEdit from "../CardEdit/View";

const Stack = createStackNavigator()
function Router({...props}) {
    const auth =  getAuth()
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            console.log('user is in!!!!')
            props.setUserID(user.uid)
            props.setUser({...user})
            // ...
        } else {
            // User is signed out
            // ...
        }
    });
    const onCardPress = async () =>{

    }
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
    const CardEditStack = () =>{
        return(
            <Stack.Screen
                name="cardEdit"
                options={({navigation})=>({
                    title: 'Card',
                    headerStyle:{backgroundColor: colors.yellow},
                })}
                children={(props) => (
                    <CardEdit
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
    const EditUserInfoStack = () =>{
        return(
            <Stack.Screen
                name="editUserInfo"
                options={({navigation})=>({
                    title: 'Profile',
                    headerStyle:{backgroundColor: colors.yellow},
                })}
                children={(props) => (
                    <EditUserInfo
                        {...props}
                    />
                )}
            />
        )
    }
    return (
        <View style={{flex:1}}>
            <Stack.Navigator>
                {BottomTabStack()}
                {LoginStack()}
                {SignUpStack()}
                {EditUserInfoStack()}
                {CardEditStack()}
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
        setUserID(res){
            const action = setUserIDAction(res)
            dispatch(action)
        },
        setUser(res){
            const action = setUserAction(res)
            dispatch(action)
        },
    }
}
export default connect(mapState, mapDispatch)(Router);