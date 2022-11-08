import {Platform, StyleSheet, Text, View} from "react-native";
import React from "react";
import {connect} from "react-redux";
import {AndroidFontFamily, colors, IOSFontFamily} from "../globalVariables";

const styles = StyleSheet.create({
    darkMode:{
        backgroundColor:colors.primaryhalfblue,
        borderRadius:100,
        width:50,
        height:50,
        marginRight:10,
        justifyContent:'center',
        alignItems:'center',
        fontSize:25
    },
    lightMode:{
        backgroundColor:colors.primaryblue,
        borderRadius:100,
        width:50,
        height:50,
        marginRight:10,
        justifyContent:'center',
        alignItems:'center',
        fontSize:25
    },
})
class TextAvatar extends React.Component {
    render() {
        return (
            <View style={[styles.lightMode, this.props.style]}>
                <Text numberOfLines={1} style={[{color:colors.white, fontWeight:'bold', fontSize:25}, this.props.textStyle]}>
                    {this.props.children}
                </Text>
            </View>
        );
    }
}

const mapState = (state) => {
    return{
        darkMode: state.account.darkMode
    }
}

export default connect(mapState, null)(TextAvatar)