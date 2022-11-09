import React, {useEffect, useState} from 'react';
import {View, Button} from "react-native";
import {connect} from "react-redux";

function CButton({title, onPress, ...props}) {
    return (
        <Button title={title} onPress={onPress}>

        </Button>
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
export default connect(mapState, mapDispatch)(CButton);