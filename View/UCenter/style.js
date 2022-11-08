import {StyleSheet} from "react-native";
import {colors, windowHeight, windowWidth} from "../../globalVariables";

const styles = StyleSheet.create({
    map: {
        height: windowHeight,
        width: windowWidth
    },
    box: {
        borderWidth: 0,
        borderRadius: 1,
        borderColor: colors.yellow,
        marginTop: 10,
        // padding:10,
        // backgroundColor:'lightblue'
    },
})

export default styles
