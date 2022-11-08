import React from "react";
import {View} from "react-native";
import styles from './generalStyles';
import {connect} from "react-redux";

class _View extends React.Component {
    render() {
        return (
            <View style={[this.props.darkMode? styles.viewDarkMode : styles.viewLightMode, this.props.style]}>
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

export default connect(mapState, null)(_View)