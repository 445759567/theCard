import React from "react";
import {connect} from "react-redux";
import {Dimensions, StyleSheet, TouchableOpacity} from "react-native";
import {colors} from "../globalVariables";

const {width, height} = Dimensions.get('window')

const styles = StyleSheet.create({
    normalActivityItemWithElevationDarkMode:{
        width: '95%',
        // height: 180,
        borderRadius: 10,
        // borderBottomRightRadius:10,
        // borderBottomLeftRadius: 10,
        backgroundColor: colors.black,
        marginBottom: 10,
        elevation: 5,
        shadowOffset: {
            width: 2,
            height: 10
        },
        shadowOpacity:0.04,
        shadowRadius:5
    },
    normalActivityItemWithElevationLightMode:{
        width: '95%',
        // height: 180,
        borderRadius: 10,
        // borderBottomRightRadius:10,
        // borderBottomLeftRadius: 10,
        backgroundColor: colors.white,
        marginBottom: 10,
        elevation: 5,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity:0.15,
        shadowRadius:4,
        marginTop:5
    },
})
class NormalActivityItemWithElevation extends React.Component {
    render() {
        return (
            <TouchableOpacity style={[this.props.darkMode? styles.normalActivityItemWithElevationDarkMode : styles.normalActivityItemWithElevationLightMode, this.props.style]} onPress={this.props.onPress}>
                {this.props.children}
            </TouchableOpacity>
        );
    }
}

const mapState = (state) => {
    return{
        darkMode: state.account.darkMode
    }
}

export default connect(mapState, null)(NormalActivityItemWithElevation)