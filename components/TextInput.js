
import {StyleSheet, TextInput as RNTextInput, View} from "react-native";
import {colors} from "../globalVariables";
import {getFontSize} from "./normalText";

const fontSize = getFontSize(12)
const styles = StyleSheet.create({
    textInputContainer: {
        margin: 10,
        borderRadius:100,
        flexDirection:'row',
        alignItems:'center',
        borderWidth:1,
        borderColor:colors.grey,
        paddingHorizontal:20
    },
    textInput:{
        padding:10,
        flex:1,
        color:colors.black,
        fontFamily: 'Poppins-Regular',
        fontSize:fontSize
    }
});
export const TextInput = ({placeholder, style, containerStyle, onChangeText, value, hide, Front, Back, ...props}) =>{
    return(
        <View style={[styles.textInputContainer, containerStyle]}>
            {Front || null}
            <RNTextInput
                {...props}
                placeholder={placeholder}
                style={[styles.textInput, style]}
                onChangeText={onChangeText}
                value={value}
            />
            {Back || null}
        </View>
    )
}