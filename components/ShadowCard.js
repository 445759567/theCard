import {Pressable, StyleSheet, Text} from "react-native";
import React from "react";
import {connect} from "react-redux";
import {colors} from "../globalVariables";


const styles = StyleSheet.create({
    lightMode:{
        backgroundColor:colors.white,
        elevation:1,
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity:0.2,
        shadowRadius:3,
    },
})
function ShadowCard ({onPress, style, elevation, ...props}){
    return (
        <Pressable style={[styles.lightMode, style, elevation?{elevation:elevation}:null]} onPress={onPress}>
            {props.children}
        </Pressable>
    );
}
const mapState = (state) => {
    return{
        // darkMode: state.account.darkMode
    }
}

export default connect(mapState, null)(ShadowCard)