import React from "react";
import {KeyboardAvoidingView, Platform, StyleSheet, View,} from "react-native";
import {connect} from "react-redux";
import {colors} from "../globalVariables";

const styles = StyleSheet.create({
    darkMode:{
        backgroundColor:colors.black,
        flex: 1,
        // padding:10,
        // justifyContent: "center",
    },
    lightMode:{
        backgroundColor:colors.lightgrey,
        flex: 1,
        // padding:10,
        // justifyContent: "center",
    },
})
class Background extends React.Component {
    render() {
        return (
            <KeyboardAvoidingView style={[this.props.darkMode? styles.darkMode : styles.lightMode, this.props.style]} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                {this.props.children}
            </KeyboardAvoidingView>
        );
    }
}


const mapState = (state) => {
    return{
        darkMode: state.account.darkMode
    }
}

export default connect(mapState, null)(Background)
