import React, {useEffect, useState} from 'react';
import {View, TextInput} from "react-native";
import {connect} from "react-redux";
import {CButton, NormalText, ShadowCard} from "../../components";
import styles from "./style";

function CardEdit({...props}) {
    const [content, setContent] = useState('')
    useEffect(() => {
        // console.log('hello')
    }, []);
    const onContentChange = (text) =>{
        setContent(text)
    }
    const onPostPress = () =>{

    }
    return (
        <View style={styles.container}>
            <NormalText style={styles.title}>Say something</NormalText>
            <ShadowCard style={styles.cardContainer}>
                <TextInput style={styles.textInput} multiline={true} value={content} onChangeText={onContentChange}/>
            </ShadowCard>
            <View style={{height:20}}/>
            <View style={{flex:1}}>

                <CButton onPress={onPostPress} title={'Post'}/>
            </View>
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
export default connect(mapState, mapDispatch)(CardEdit);