import React, {useEffect, useState} from 'react';
import {ScrollView, TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";
import {NormalText} from "../../components";
import {reducer as cardEdit} from "./index";
import {setCardStyleIDAction} from "./actionCreator";
import {windowWidth} from "../../globalVariables";
import {cardStyles} from "../../CardStyles";
import styles from "./style";

function CardPicker({...props}) {
    const [value, setValue] = useState(0)
    useEffect(() => {
        // console.log('hello')
    }, []);
    const onStyleChoose = (id) =>{
        props.setCardStyleID(id)
    }
    return (
        <ScrollView horizontal={true} style={{}} showsHorizontalScrollIndicator={false}>
            {
                Object.keys(cardStyles).map((item, index)=>{
                    return(
                        <TouchableOpacity style={[cardStyles[item].card, styles.cardPickerItem]} onPress={()=>onStyleChoose(item)} key={index}>

                        </TouchableOpacity>
                    )
                })
            }
        </ScrollView>
    );
}

const mapState = (state) => {
    return {
        signIn: state.cardEdit.signIn,
    }
}
const mapDispatch = (dispatch) => {
    return {
        setCardStyleID(res){
            const action = setCardStyleIDAction(res)
            dispatch(action)
        },
    }
}
export default connect(mapState, mapDispatch)(CardPicker);