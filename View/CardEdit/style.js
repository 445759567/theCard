import {StyleSheet} from "react-native";
import {colors, windowHeight, windowWidth} from "../../globalVariables";

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:10,
        justifyContent:'center',
        alignItems:'center'
    },
    cardContainer:{
        width: windowWidth*0.9,
        height: windowWidth*0.9,
        padding:20
    },
    title:{
        fontSize:20,
        fontWeight:'bold',
        margin:20
    },
    textInput:{
        // color:colors.white
        // borderBottomWidth:1,
        // borderColor:colors.grey
    },
    cardPickerItem:{
        width: windowWidth*0.3,
        height: undefined,
        aspectRatio:1,
        marginHorizontal:5
    },
})

export default styles
