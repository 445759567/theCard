import React from "react";
import {TouchableOpacity, StyleSheet, ActivityIndicator, View, Text} from "react-native";
import {colors} from "../globalVariables";
import NormalText from "./normalText";

export default function IKidzButton({title, variant = 'default', disabled, loading, onPress, children, FrontIcon, ...props}) {
    const titleElement = React.isValidElement(title) ? (
        title
    ) : (
        <NormalText font={'bold'} style={[styles.text, variant === 'primary' ? styles.textPrimary :variant === 'secondary' ? styles.textSecondary: variant === 'third' ? styles.textThird: styles.textForth]}>
            {title}
        </NormalText>
    );
    return (
        <View style={disabled && styles.disabled}>
            <TouchableOpacity
                disabled={disabled}
                style={[
                    styles.container,
                    variant === 'primary' ? styles.primaryContainer: variant === 'secondary' ? styles.secondaryContainer: variant === 'third' ? styles.thirdContainer: styles.forthContainer,
                    props.style
                ]}
                onPress={onPress}
            >
                {FrontIcon? FrontIcon:null}
                {loading ? (
                    <ActivityIndicator color={colors.white} size="small" />
                ) : (
                    children?children: titleElement
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        // paddingVertical:7,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent:'center',
        margin:5,
        minWidth:100,
        height:40,
        flexDirection:'row'
    },
    primaryContainer: {
        backgroundColor: colors.yellow,
    },
    secondaryContainer: {
        backgroundColor: colors.warnOrange,
    },
    thirdContainer: {
        backgroundColor: colors.white,
        borderWidth:1,
        borderColor:colors.grey
    },
    forthContainer: {
        backgroundColor: colors.primaryblue,
    },
    text: {
        color: colors.black,
        fontSize: 16,
    },
    textPrimary: {
        color: colors.black,
    },
    textSecondary: {
        color: colors.white,
    },
    textThird: {
        color: colors.black,
    },
    textForth: {
        color: colors.white,
    },
    disabled: {
        opacity: 0.3,
    },
});