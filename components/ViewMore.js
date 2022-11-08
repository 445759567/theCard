import {TouchableOpacity} from "react-native";
import NormalText from "./normalText";
import {colors} from "../globalVariables";
import React from "react";
import {connect} from "react-redux";


const ViewMore = ({onPress, ...props}) =>{
    return(
        <TouchableOpacity onPress={onPress}>
            <NormalText style={{color: colors.black}}>{props.wording.viewmore} >></NormalText>
        </TouchableOpacity>
    )
}
const mapState = (state) => {
    return{
        parentId: state.account.parentId,
        wording: state.account.wording,
    }
}
const mapDispatch = (dispatch) => {
    return {
        // setPlaceChosen(res){
        //     const action = setPlaceChosenAction(res)
        //     dispatch(action)
        // },
    }
}
export default connect(mapState, mapDispatch)(ViewMore);