import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";
import {NormalText} from "../../components";
import {getAuth, updateProfile} from 'firebase/auth';
import {useNavigation} from "@react-navigation/native";
import {colors} from "../../globalVariables";
import {TextInput} from "../../components/TextInput";
import IKidzButton from "../../components/ikidzButton";
import {setUserAction, setUserIDAction} from "./actionCreator";

function EditUserInfo({...props}) {
    // const navigation = useNavigation()
    const [errorMessage, setErrorMessage] = useState('')
    const [message, setMessage] = useState('')
    const [nickName, setNickName] = useState(props.user.displayName)
    const [photoUrl, setPhotoUrl] = useState('')
    const [updateLoading, setUpdateLoading] = useState(false)
    useEffect(() => {
        // console.log('hello')
    }, []);
    const onNickNameChange = (text) =>{
        setNickName(text)
    }
    const onUpdatePress = async () =>{
        const auth = getAuth()
        setUpdateLoading(true)
        try {
            await updateProfile(auth.currentUser, {
                displayName: nickName,
                photoURL: photoUrl
            })
            setMessage('Your profile is updated')
            setUpdateLoading(false)
            //get profile
            const newAuth = getAuth()
            props.setUser({...newAuth.currentUser})
        }catch (e) {
            setMessage('')
            setErrorMessage(e.name+':\n'+e.code)
            setUpdateLoading(false)
        }
    }
    return (
        <View style={{padding:10, alignItems:'center', justifyContent:'center', flex:1}}>
            {
                errorMessage &&
                <NormalText style={{color:colors.warnOrange}}>{errorMessage}</NormalText>
            }
            {
                message &&
                <NormalText style={{color:colors.warnOrange}}>{message}</NormalText>
            }
            <TextInput
                value={nickName}
                placeholder={'nick name'}
                onChangeText={onNickNameChange}
            />

            <IKidzButton title={'Update'} onPress={onUpdatePress} loading={updateLoading} disabled={updateLoading}/>
        </View>
    );
}

const mapState = (state) => {
    return {
        user: state.user.user,
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
export default connect(mapState, mapDispatch)(EditUserInfo);