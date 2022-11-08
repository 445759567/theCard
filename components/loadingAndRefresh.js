import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {connect} from "react-redux";
import {colors} from "../globalVariables";
import IKidzButton from "./ikidzButton";

const styles = StyleSheet.create({
    darkMode:{
        color: colors.grey,
        fontSize: 14,
        fontFamily: 'Roboto'
    },
    lightMode:{
        alignItems:'center', justifyContent:'center',
    },
})
function LoadingAndRefresh ({onRefreshPress, ...props}) {
        return (
            <View style={styles.lightMode}>
                <Text>Oops... Something went wrong</Text>
                <Text>Please check your network and try again</Text>
                <IKidzButton
                    loading={props.loading}
                    variant="primary"
                    title="Refresh"
                    onPress={onRefreshPress}
                />
            </View>
        );
}

const mapState = (state) => {
    return{
        darkMode: state.account.darkMode
    }
}

export default connect(mapState, null)(LoadingAndRefresh)