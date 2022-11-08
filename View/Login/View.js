import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";
import {NormalText} from "../../components";
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {useNavigation} from "@react-navigation/native";
import {colors} from "../../globalVariables";
import {TextInput} from "../../components/TextInput";
import IKidzButton from "../../components/ikidzButton";
import {setUserAction, setUserIDAction} from "../UCenter/actionCreator";

function Login({...props}) {
    const navigation = useNavigation()
    const auth = getAuth()
    const [errorMessage, setErrorMessage] = useState('')
    const [emailAddress, setEmailAddress] = useState('tdy9600009@gmail.com')
    const [password, setPassword] = useState('123456')
    const [signInLoading, setSignInLoading] = useState(false)
    useEffect(() => {
        // console.log('hello')
    }, []);
    const onEmailAddressChange = (text) =>{
        setEmailAddress(text)
    }
    const onPasswordChange = (text) =>{
        setPassword(text)
    }
    const onSignUpPress = () =>{
        navigation.navigate('signUp')
    }
    const onSignInPress = async () =>{
        setSignInLoading(true)
        try {
            const userCredential = await signInWithEmailAndPassword(auth, emailAddress, password)
            setSignInLoading(false)
            props.setUser(userCredential.user)
            props.setUserID(userCredential.user.uid)
            navigation.navigate('Home')
        }catch (e) {
            // console.log(e)
            setErrorMessage(e.name+':\n'+e.code)
            setSignInLoading(false)
        }
    }
    return (
        <View style={{padding:10, alignItems:'center', justifyContent:'center', flex:1}}>
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

            <IKidzButton title={'Sign In'} onPress={onSignInPress} loading={signInLoading}/>
            <TouchableOpacity onPress={onSignUpPress}>
                <NormalText>Don't have an account? Sign up</NormalText>
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
export default connect(mapState, mapDispatch)(Login);