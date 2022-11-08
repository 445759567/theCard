import React, {useEffect, useState} from 'react';
import {Alert, TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";
import {NormalText} from "../../components";
import ShadowCard from "../../components/ShadowCard";
import {Avatar} from "../../components/Avatar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {colors} from "../../globalVariables";
import styles from "./style";
import {useNavigation} from "@react-navigation/native";
import {getAuth, signOut} from "firebase/auth";
import {setUserAction, setUserIDAction} from "./actionCreator";

function UCenter({...props}) {
    const auth = getAuth()
    const navigation = useNavigation()
    const [value, setValue] = useState(0)
    useEffect(() => {

    }, []);
    const onUserTitlePress = () =>{
        if(!props.userID){
            onSignIn()
        }
    }
    const onSignIn = () =>{
        navigation.navigate('login')
    }
    const onSignOutPress = async () =>{
        Alert.alert(
            'Log out your account?',
            '',
            [
                {
                    text:'Cancel',
                    onPress: ()=>{},
                    style: 'cancel'
                },
                {
                    text:'Yes',
                    onPress: ()=>{
                        onSignOut()
                    }
                }
            ]
        )
    }
    const onSignOut = async () =>{
        try {
            const res = await signOut(auth)
            console.log(res)
            props.setUser({})
            props.setUserID('')
        }catch (e) {
            alert(e)
        }
    }
    return (
        <View style={{padding:0}}>
            <TouchableOpacity style={styles.userTitle} onPress={onUserTitlePress}>
                {
                    props.user.photoURL?
                        <Avatar/>:
                        <ShadowCard style={{borderRadius:100, backgroundColor:colors.white}}>
                            <MaterialCommunityIcons name={'account'} color={colors.black} size={40}/>
                        </ShadowCard>
                }
                {
                    props.userID?
                        <View style={{alignItems:'center'}}>
                            <NormalText>{props.user.email}</NormalText>
                            <NormalText>{props.user.displayName || 'Unnamed user'}, welcome to The Card</NormalText>
                        </View>:
                        <NormalText>Sign in</NormalText>
                }
            </TouchableOpacity>
            <View style={{alignItems:'flex-end', padding:10}}>

                {
                    props.userID?
                        <TouchableOpacity onPress={onSignOutPress}>
                            <MaterialCommunityIcons name={'logout'} color={colors.black} size={30}/>
                        </TouchableOpacity>:null
                }
            </View>
        </View>
    );
}

const mapState = (state) => {
    return {
        user: state.user.user,
        userID: state.user.userID,
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
export default connect(mapState, mapDispatch)(UCenter);