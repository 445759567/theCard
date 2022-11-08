import {StyleSheet, View} from "react-native";
import React from "react";
import {connect} from "react-redux";
import {colors} from "../globalVariables";

const styles = StyleSheet.create({
    darkMode:{
        borderColor: colors.dividerGrey,
        borderTopWidth: 1
    },
    lightMode:{
        borderColor: colors.dividerGrey,
        borderTopWidth: 1
    },
})
class Divider extends React.Component {
    render() {
        return (
            <View style={[this.props.darkMode? styles.darkMode : styles.lightMode, this.props.style]}>
                {this.props.children}
            </View>
        );
    }
}

const mapState = (state) => {
    return{
        darkMode: state.account.darkMode
    }
}

export default connect(mapState, null)(Divider)