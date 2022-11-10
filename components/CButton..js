import React from 'react';
import {connect} from "react-redux";
import { Button } from "@react-native-material/core";

function CButton({title, onPress, loading, style, ...props}) {
    return (
        <Button title={title} onPress={onPress} style={style} loading={loading}>

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