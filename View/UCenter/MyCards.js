import React, {useEffect, useState} from 'react';
import {ScrollView, View} from "react-native";
import {connect} from "react-redux";
import {NormalText} from "../../components";
import {colors} from "../../globalVariables";
import ShadowCard from "../../components/ShadowCard";
import { getDatabase, ref, get, child, onValue } from "firebase/database";
import styles from "./style";
import {cardStyles} from "../../CardStyles";


const Card = ({title, cardStyleID}) =>{
    return(
        <ShadowCard style={[styles.cardContainer, cardStyles[cardStyleID].card]}>
            <NormalText style={cardStyles[cardStyleID].text}>{title}</NormalText>
        </ShadowCard>
    )
}
function MyCards({...props}) {
    const dbRef = ref(getDatabase());
    const [myCards, setMyCards] = useState([])
    useEffect(() => {
        getCards()
    }, []);
    const getCards = async ()=>{
        const db = getDatabase()
        const cardsRef = ref(db, `users/${props.userID}/cards`)
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
            setMyCards(cards)
        })
    }
    return (
        <View style={{padding:10, backgroundColor:colors.white}}>
            <NormalText>MyCards: </NormalText>
            <ScrollView horizontal={true}>
                {
                    myCards.slice(0, 5).map((item, index)=>{
                        return(
                            <Card title={item.content} key={index} cardStyleID={item.cardStyle}/>
                        )
                    })
                }
            </ScrollView>
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
export default connect(mapState, mapDispatch)(MyCards);