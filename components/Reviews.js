import React, {useEffect, useRef, useState} from 'react';
import {Image, Modal, Pressable, ScrollView, TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";
import NormalText from "./normalText";
import ShadowCard from "./ShadowCard";
import {colors, imageRadio, windowHeight, windowWidth} from "../globalVariables";
import RatingStar from "./RatingStar";
import moment from "moment";
import WPReviews from "./WPReviews";
import {normalizeIconSize} from "../functions/sizeNormalize";
import {Subtitle} from "../View/LearningDetail/Subtitle";
import ReviewInput from "./ReviewInput";

export const ReviewItemContent = ({item, lines}) =>{
    const avatarSize = normalizeIconSize(25)
    return(
        <View style={{flex:1}}>
            <View style={{flexDirection:'row', marginBottom:10, alignItems:'center'}}>
                <ShadowCard style={{borderRadius:50, height:avatarSize, width:avatarSize, backgroundColor:colors.white}}>
                    <Image source={{uri:item.profile_photo_url}} style={{width:'100%', height:'100%', borderRadius:50}}/>
                </ShadowCard>
                <View style={{marginLeft:10, flex:1}}>
                    <NormalText style={{}} fontSize={11} numberOfLines={1}>{item.author_name}</NormalText>
                    <NormalText fontSize={11} style={{color:colors.grey}}>{(typeof item.time)==='number'?moment(item.time*1000).format('DD/MM/YYYY') : moment(item.time).format('DD/MM/YYYY')}</NormalText>
                </View>
                {
                    (item.rating && item.rating !== 0)?
                        <View>
                            <RatingStar rating={item.parent?item.rating/2:item.rating} starSize={20}/>
                            {
                                item.meta?null:
                                    <NormalText font={'lighter'} fontSize={10} style={{color:colors.grey, alignSelf:'flex-end'}}>From Google</NormalText>
                            }
                        </View>:null
                }
            </View>
            <View style={{flex:1}}>
                <NormalText numberOfLines={lines || 4} font={'lighter'} fontSize={13}>{item.text}</NormalText>
                <View style={{flexDirection:'row', flexWrap:'wrap', marginTop:10}}>
                    {
                        (lines && item.meta)?
                            item.meta.gallery?.slice(0,3)?.map((image, imageIndex)=>{
                                return(
                                    <Pressable key={imageIndex} style={{marginRight:5, marginBottom:5}}>
                                        <Image source={{uri:image.thumbnail}} style={{width:80, height:80}}/>
                                    </Pressable>
                                )
                            }):null
                    }
                </View>
            </View>
        </View>
    )
}
const ReviewItem = ({item, onPress}) =>{
    return(
        <ShadowCard onPress={onPress} style={{width:windowWidth*0.7, height:undefined, aspectRatio:imageRadio, marginVertical:10, marginHorizontal:5, borderRadius:10, padding:10}}>
            <ReviewItemContent item={item}/>
        </ShadowCard>
    )
}
function Reviews({onReviewPress, wpReviews, postID, getReviews, ...props}) {
    const [reviews, setReviews] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [existingReview, setExistingReview] = useState(null)
    const inputRef = useRef()
    useEffect(()=>{
        // console.warn(wpReviews)
        let result = []
        if(wpReviews){
            wpReviews.map(review=>{
                if(review.parent === "0"){
                    result.push(review)
                    if(Number(review.author_id) === props.parentId){
                        setExistingReview(review)
                    }
                }
            })
        }
        result = [...result, ... props.reviews.reviews]
        setReviews(result)
    }, [wpReviews, props.reviews])
    const onModalOpen = ()=>{
        setShowModal(true)
    }
    const onModalClose = () =>{
        setShowModal(false)
    }
    // if(props.reviews.reviews.length < 1){
    //     return(<View/>)
    // }
    const onReplyPress = (review) =>{
        inputRef.current.onModalOpen()
        inputRef.current.onReviewReply(review)
    }
    const onEditPress = (review, parentReview) =>{
        inputRef.current.onModalOpen()
        inputRef.current.onCommentEdit(review, parentReview)
    }
    return (
        <View style={{backgroundColor:colors.white, padding:20, marginBottom:7}}>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Subtitle text={props.wording.Reviews}/>
                <TouchableOpacity onPress={onModalOpen}>
                    <NormalText fontSize={12} style={{textDecorationLine:'underline'}}>view more</NormalText>
                </TouchableOpacity>
            </View>
            <ScrollView horizontal style={{marginLeft:-5}} showsHorizontalScrollIndicator={false}>
                {
                    reviews.slice(0,5).map((item, index)=>{
                        return(
                            <ReviewItem item={item} key={index} onPress={()=>onReviewPress(item)}/>
                        )
                    })
                }
            </ScrollView>
            {
                reviews.length < 1?
                    <View style={{padding:10}}>
                        <NormalText font={'lighter'} fontSize={12}>There is no review found yet. Leave your review as the first one? Press the field bellow.</NormalText>
                    </View>:null
            }
            <ReviewInput {...props} ref={inputRef} existingReview={existingReview} postID={postID} getReviews={getReviews}/>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
                onRequestClose={onModalClose}
            >
                <View style={{flex:1, backgroundColor:colors.opacityGrey}}>
                    <Pressable style={{flex:1}} onPress={onModalClose}/>
                    <ScrollView style={{maxHeight:windowHeight*0.7, backgroundColor:colors.white, borderTopLeftRadius:20, borderTopRightRadius:20}}>
                        <NormalText font={'bold'} fontSize={16} style={{margin:20, marginBottom:0}}>All reviews</NormalText>
                        <WPReviews reviewTree={wpReviews} onReplyPress={onReplyPress} onEditPress={onEditPress}/>
                        <View style={{height:50}}/>
                    </ScrollView>
                    <View style={{paddingHorizontal:10, position:'absolute', bottom:30, left:0, width:'100%'}}>
                        <ReviewInput {...props} ref={inputRef} existingReview={existingReview} postID={postID} getReviews={getReviews}/>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
const mapState = (state) => {
    return{
        wording: state.account.wording,
        reviews: state.placeToGoDetail.reviews,
        parentId: state.account.parentId,
        parent: state.accountHome.parent,
    }
}
// const mapDispatch = (dispatch) => {
//     return {
//         // setCompanyId(res){
//         //     const action = setCompanyIdAction(res)
//         //     dispatch(action)
//         // },
//     }
// }
export default connect(mapState, null)(Reviews);