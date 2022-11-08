import {StyleSheet, ActivityIndicator} from "react-native";
import React from "react";
import {connect} from "react-redux";
import {colors} from "../globalVariables";

const styles = StyleSheet.create({
    darkMode:{
        // position:'absolute',
        // top:0,
        // left:0,
        // right:0,
        // bottom:0
    },
    lightMode:{
        position:'absolute',
        top:0,
        left:0,
        right:0,
        bottom:0
    },
})
class IKIDZLoading extends React.Component {
    render() {
        return (
            <ActivityIndicator color={colors.yellow} size="large" style={styles.lightMode}/>
        );
    }
}

const mapState = (state) => {
    return{
        darkMode: state.account.darkMode
    }
}

export default connect(mapState, null)(IKIDZLoading)