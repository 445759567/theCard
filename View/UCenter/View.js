import React, {useEffect, useState} from 'react';
import {Alert, Button, TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";
import {NormalText} from "../../components";
import ShadowCard from "../../components/ShadowCard";
import {Avatar} from "../../components/Avatar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {colors} from "../../globalVariables";
import styles from "./style";
import {useNavigation} from "@react-navigation/native";
import {getAuth, signOut, sendEmailVerification, reload} from "firebase/auth";
import {setUserAction, setUserIDAction} from "./actionCreator";
import IKidzButton from "../../components/ikidzButton";
import MyCards from "./MyCards";

const activateTimeLimit = 60
function UCenter({...props}) {
    const navigation = useNavigation()
    const auth = getAuth()
    const [activateButtonLoading, setActivateButtonLoading] = useState(false)
    const [activateCountdown, setActivateCountdown] = useState(0)
    useEffect(() => {
        if(!props.userID) {
            setActivateCountdown(0)
            return;
        }
        if(activateCountdown > 0){
            setTimeout(()=>{
                setActivateCountdown(activateCountdown-1)
            }, 1000)
        }
        if(activateCountdown % 10 === 0 && !props.user.emailVerified && activateCountdown > 0){
            console.log('getting user info')
            reload(auth.currentUser).then(()=>{
                console.log(auth.currentUser)
                if(auth.currentUser.emailVerified){
                    props.setUser({...auth.currentUser})
                    setActivateButtonLoading(false)
                    setActivateCountdown(0)
                }
            })
        }
    }, [activateCountdown]);
    const onUserTitlePress = () =>{
        if(!props.userID){
            onSignIn()
        }else{
            navigation.navigate('editUserInfo')
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
    const onVerifyPress = async () =>{
        setActivateButtonLoading(true)
        try {
            await sendEmailVerification(auth.currentUser)
            setActivateButtonLoading(false)
            alert('An email has been sent to your email, verify your account by clicking the link in the email. Check junk box if necessary.')
            setActivateCountdown(activateTimeLimit)
        }catch (e) {
            alert(e.name+': '+e.code)
        }
    }
    const onTestPress = () =>{
        // setActivateButtonLoading(false)
        // reload(auth.currentUser).then(()=>{
        //     console.log(auth.currentUser)
        // })
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
                            <NormalText>{props.user.displayName || 'Unnamed user'}, welcome to The Card!</NormalText>
                        </View>:
                        <NormalText>Sign in</NormalText>
                }
            </TouchableOpacity>
            {
                props.userID && (
                    props.user.emailVerified?
                        <View>
                            <NormalText>Your email is verified</NormalText>
                        </View>:
                        <View style={{padding:10}}>
                            <NormalText>To start, activate your account</NormalText>
                            <IKidzButton title={'Activate' + (activateCountdown > 0? `(${activateCountdown})`:'')} onPress={onVerifyPress} loading={activateButtonLoading} disabled={activateButtonLoading || activateCountdown >0}/>
                        </View>
                )
            }

            <MyCards/>

            <View style={{alignItems:'flex-end', padding:10}}>

                {
                    props.userID?
                        <TouchableOpacity onPress={onSignOutPress}>
                            <MaterialCommunityIcons name={'logout'} color={colors.black} size={30}/>
                        </TouchableOpacity>:null
                }
            </View>
            <Button title={'test'} onPress={onTestPress}/>
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