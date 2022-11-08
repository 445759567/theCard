import React, {useEffect, useState} from 'react';
import {View} from "react-native";
import {connect} from "react-redux";
import {NormalText} from "../../components";

function Login({...props}) {
    const [value, setValue] = useState(0)
    useEffect(() => {
        console.log('hello')
    }, []);
    return (
        <View>
            <NormalText>Login: </NormalText>
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
export default connect(mapState, mapDispatch)(Login);