import React, {useEffect, useState} from 'react';
import {Button, FlatList, TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";
import {NormalText} from "../../components";
import {useNavigation} from "@react-navigation/native";
import {getDatabase, onValue, ref} from "firebase/database";
import styles from "./style";
import {cardStyles} from "../../CardStyles";

function CardsTab({...props}) {
    const navigation = useNavigation()
    const [cards, setCards] = useState([])
    useEffect(() => {
        // console.log('hello')
        getCards()
    }, []);
    const getCards = async () =>{
        const db = getDatabase()
        const cardsRef = ref(db, `cards`)
        onValue(cardsRef, (snapshot) =>{
            const data = snapshot.val()
            //get cards which are active
            const cards = Object.keys(data).reduce(function (a, b) {
                console.log(b)
                if(data[b].active){
                    a.push(data[b])
                }
                return a
            }, [])
            console.log(cards)
            setCards(cards)
        })
    }
    const onPostNewCardPress = () =>{
        if(!props.userID){
            alert('Please sign in first')
            return
        }
        navigation.navigate('cardEdit')
    }
    const Card = ({item}) =>{
        return(
            <TouchableOpacity style={[styles.card, cardStyles[item.cardStyle].card]}>
                <NormalText style={cardStyles[item.cardStyle].text}>{item.content}</NormalText>
            </TouchableOpacity>
        )
    }
    return (
        <View style={{flex:1}}>
            <View style={{flex:1}}>
                <FlatList
                    // contentContainerStyle={{justifyContent:'space-between'}}
                    data={cards}
                    renderItem={Card}
                    numColumns={2}
                    keyExtractor={(item, index) => index}
                />
            </View>
            <Button title={'Post your Card'} onPress={onPostNewCardPress}/>
        </View>
    );
}

const mapState = (state) => {
    return {
        userID: state.user.userID,
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