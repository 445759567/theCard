import {Dimensions, StyleSheet} from "react-native";
import React from "react";
import {colors} from "../globalVariables";

const {width, height} = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    imageDarkMode:{
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 2
    },
    imageLightMode:{

    },
    viewDarkMode:{
        backgroundColor: '#2e2e27',
    },
    viewLightMode:{
        backgroundColor: 'white'
    }
});

export default styles