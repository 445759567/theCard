import React, {useEffect, useState} from 'react';
import {ScrollView, View} from "react-native";
import {connect} from "react-redux";
import {NormalText} from "../../components";
import {colors} from "../../globalVariables";
import ShadowCard from "../../components/ShadowCard";
import { getDatabase } from "firebase/database";


const Card = ({bgColor}) =>{
    return(
        <ShadowCard style={{backgroundColor:bgColor, margin:10, borderRadius:10, padding:10}}>
            <NormalText style={{color:colors.white}}>I'm a card</NormalText>
        </ShadowCard>
    )
}
function MyCards({...props}) {
    const database = getDatabase();
    const [value, setValue] = useState(0)
    useEffect(() => {
        // console.log('hello')
    }, []);
    return (
        <View style={{padding:10, backgroundColor:colors.white}}>
            <NormalText>MyCards: </NormalText>
            <ScrollView horizontal={true}>
                <Card bgColor={colors.brown}></Card>
            </ScrollView>
        </View>
    );
}

const mapState = (state) => {
    return {
        //signIn: state.account.signIn,
    }
}
const mapDispatch = (dispatch) => {
    return {
        // setCompanyId(res){
        //     const action = setCompanyIdAction(res)
        //     dispatch(action)
        // },
    }
}
export default connect(mapState, mapDispatch)(MyCards);