import {Animated, StyleSheet, View} from "react-native";
import {colors} from "../globalVariables";
import React, {useEffect, useRef} from "react";


import {connect} from "react-redux";

const IKidzFlipCard =({Front, Back, isFrontCard})=>{
    useEffect(() => {
        isFrontCard? flipToFront():flipToBack()
    }, [isFrontCard]);

    const flipAnimation = useRef( new Animated.Value( 0 ) ).current;
    const flipToFrontStyle = {
        transform: [
            { rotateY: flipAnimation.interpolate( {
                    inputRange: [ 0, 180 ],
                    outputRange: [ "0deg", "180deg" ]
                } ) }
        ]
    };
    const flipToBackStyle = {
        transform: [
            { rotateY: flipAnimation.interpolate( {
                    inputRange: [ 0, 180 ],
                    outputRange: [ "180deg", "360deg" ]
                } ) }
        ]
    };
    const flipToBack = () => {
        Animated.timing( flipAnimation, {
            toValue: 180,
            duration: 300,
            useNativeDriver: true,
        } ).start();
    };
    const flipToFront = () => {
        Animated.timing( flipAnimation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        } ).start();
    };
    return(
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Animated.View style={[cardStyles.container, cardStyles.cardFront, flipToFrontStyle]} pointerEvents={!isFrontCard?"none":"auto"}>
                <Front/>
            </Animated.View>

            <Animated.View style={[ cardStyles.container, cardStyles.cardBack, flipToBackStyle]} pointerEvents={isFrontCard?"none":"auto"}>
                <Back/>
            </Animated.View>
        </View>
    )
}
const mapState = (state) => {
    return{
        darkMode: state.account.darkMode
    }
}

const cardStyles = StyleSheet.create({
    container:{
        backgroundColor:colors.white, width:'75%', borderRadius:20, alignItems:'center',justifyContent:'center',
        elevation:8, shadowOffset: {
            width: 0,
            height: -1
        },
        shadowOpacity:0.3,
        shadowRadius:5,
        // height:200
    },
    cardFront:{
        backfaceVisibility:'hidden',
        position:'absolute'
    },
    cardBack:{
        backfaceVisibility:'hidden',
        // backgroundColor:colors.white
    }
})
export default connect(mapState, null)(IKidzFlipCard)
