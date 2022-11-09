import React, {useEffect, useState} from 'react';
import {Button, View} from "react-native";
import {connect} from "react-redux";
import {NormalText} from "../../components";
import {useNavigation} from "@react-navigation/native";

function CardsTab({...props}) {
    const navigation = useNavigation()
    const [value, setValue] = useState(0)
    useEffect(() => {
        // console.log('hello')
    }, []);
    const onPostNewCardPress = () =>{
        navigation.navigate('cardEdit')
    }
    return (
        <View>
            <NormalText>CardsTab: </NormalText>
            <Button title={'Post your Card'} onPress={onPostNewCardPress}/>
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
export default connect(mapState, mapDispatch)(CardsTab);