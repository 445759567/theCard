import {Platform, Text, View} from "react-native";
import React from "react";
import {connect} from "react-redux";
import {colors} from "../globalVariables";
import LinearGradient from "./LinearGradient";
// import LinearGradient from 'react-native-linear-gradient';

// const styles = StyleSheet.create({
//     darkMode:{
//         color: colors.grey,
//         fontSize: 14,
//         fontFamily: Platform.OS === 'ios'? IOSFontFamily:AndroidFontFamily
//     },
//     lightMode:{
//         color: colors.grey,
//         fontSize: 14,
//         fontFamily: Platform.OS === 'ios'? IOSFontFamily:AndroidFontFamily
//     },
// })
class Free extends React.Component {
    render() {
        if(Platform.OS === 'android'){
            return (
                // <View style={{height:35, width:35, position:'absolute', right:-20, top:-10, borderRadius:10, borderBottomLeftRadius:25, borderBottomRightRadius:5}}>
                <LinearGradient
                    colors={['#438c33', '#69b21b']}
                    start={{x:1,y:0}}
                    end={{x:0, y:1}}
                    // style={{height:'100%', width:'100%'}}
                    style={{height:35, width:35, position:'absolute', right:-20, top:-10, borderBottomLeftRadius:25, borderBottomRightRadius:5}}
                >
                    <Text style={{color:colors.white, fontWeight:'bold', fontSize:12, transform:[{rotate: '45deg'}], position:'absolute', top:7, right:1}}>FREE</Text>
                </LinearGradient>
                // </View>
            );
        }else{
            return (
                <View style={{height:35, width:35, position:'absolute', right:-20, top:-10, borderBottomLeftRadius:100, borderBottomRightRadius:5, backgroundColor:'#438c33'}}>
                    <Text style={{color:colors.white, fontWeight:'bold', fontSize:12, transform:[{rotate: '45deg'}], position:'absolute', top:7, right:1}}>FREE</Text>
                </View>
            );
        }
    }
}

const mapState = (state) => {
    return{
        darkMode: state.account.darkMode
    }
}

export default connect(mapState, null)(Free)