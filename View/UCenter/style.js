import {StyleSheet} from "react-native";
import {colors, windowHeight, windowWidth} from "../../globalVariables";

const styles = StyleSheet.create({
    userTitle:{
        // flexDirection:'row',
        padding:10,
        borderBottomWidth:1,
        borderColor:colors.lightgrey,
        backgroundColor:colors.white,
        alignItems:'center',
        justifyContent:'center'
    },
    cardContainer:{
        margin:10,
        borderRadius:10,
        padding:10,
        width: windowWidth*0.4,
        height: windowWidth*0.4
    }
})

export default styles
