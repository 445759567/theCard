import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";
import {NormalText} from "../../components";
import {TextInput} from "../../components/TextInput";
import IKidzButton from "../../components/ikidzButton";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {colors} from "../../globalVariables";
import {setUserAction, setUserIDAction} from "../UCenter/actionCreator";
import {useNavigation} from "@react-navigation/native";

function SignUp({...props}) {
    const auth = getAuth()
    const navigation = useNavigation()
    const [errorMessage, setErrorMessage] = useState('')
    const [emailAddress, setEmailAddress] = useState('tdy9600009@gmail.com')
    const [password, setPassword] = useState('123456')
    const [repeatPassword, setRepeatPassword] = useState('123456')
    const [signUpLoading, setSignUpLoading] = useState(false)

    useEffect(() => {

    }, []);

    const onEmailAddressChange = (text) =>{
        setEmailAddress(text)
    }
    const onPasswordChange = (text) =>{
        setPassword(text)
    }
    const onRepeatPassword = (text) =>{
        setRepeatPassword(text)
    }
    const onSignUpPress = async () =>{
        if(password !== repeatPassword){
            setErrorMessage('Password is different from Confirmed')
            return
        }
        setSignUpLoading(true)
        try {
            console.log('signing up user')
            setErrorMessage('')
            const userCredential = await createUserWithEmailAndPassword(auth, emailAddress, password)
            console.log(userCredential.user)
            setSignUpLoading(false)
            props.setUser(userCredential.user)
            props.setUserID(userCredential.user.uid)
            navigation.navigate('Home')
        }catch (e) {
            setErrorMessage(e.name+':\n'+e.code)
            setSignUpLoading(false)
        }
    }
    const onSignInPress = () =>{
        navigation.navigate('login')
    }
    return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            {
                errorMessage &&
                <NormalText style={{color:colors.warnOrange}}>{errorMessage}</NormalText>
            }
            <TextInput
                value={emailAddress}
                placeholder={'Email'}
                onChangeText={onEmailAddressChange}
            />
            <TextInput
                value={password}
                placeholder={'password'}
                onChangeText={onPasswordChange} secureTextEntry
            />
            <TextInput
                value={repeatPassword}
                placeholder={'Confirm Password'}
                onChangeText={onRepeatPassword} secureTextEntry
            />

            <IKidzButton title={'Sign Up'} onPress={onSignUpPress} loading={signUpLoading}/>

            <TouchableOpacity onPress={onSignInPress}>
                <NormalText>Already have an account? Sign in</NormalText>
            </TouchableOpacity>
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
export default connect(mapState, mapDispatch)(SignUp);