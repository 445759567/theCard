
import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import {
    Image,
    View,
    TextInput,
    TouchableOpacity,
    Pressable,
    Modal,
    KeyboardAvoidingView,
    Platform,
    Alert
} from "react-native";
import {colors} from "../globalVariables";
import ShadowCard from "./ShadowCard";
import iconPin from '../assets/icons/pinMap.png'
import NormalText from "./normalText";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import RatingStar from "./RatingStar";
import {pickGallery} from "../globalFunctions";
import {normalizeIconSize} from "../functions/sizeNormalize";
import {postReviewAxios} from "../APIs/wordpress/events";
import IKidzButton from "./ikidzButton";


function ReviewInput(props, ref) {
    const [text, setText] = useState('')
    const [chosenReview, setChosenReview] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [rate, setRate] = useState(0)
    const [gallery, setGallery] = useState([])
    const [galleryOrigin, setGalleryOrigin] = useState([])//ID s
    const [postLoading, setPostLoading] = useState(false)
    const [editCommentId, setEditCommentId] = useState(null)
    const iconSize = 20
    const imageSize = normalizeIconSize(30)
    useImperativeHandle(ref, () => ({
        // methods connected to `ref`
        onModalOpen: () => {
            onModalOpen()
        },
        onReviewReply:(review)=>{
            console.log(review)
            setChosenReview(review)
            setText('')
            setGallery([])
            setRate(0)
            setGalleryOrigin([])
            setEditCommentId(null)
        },
        onCommentEdit:(review, parentReview)=>{
            console.log(review)
            setChosenReview(parentReview)
            setText(review.text)
            setGallery([])
            setRate(0)
            setGalleryOrigin([])
            setEditCommentId(review.id)
        },
    }))
    useEffect(()=>{
        // console.warn(props.existingReview)
        if(props.existingReview){
            setExistingReview()
        }
    },[props.existingReview])
    const setExistingReview = () =>{
        let text = props.existingReview.text
        if(text.indexOf(`(edited at 20`)){
            let re = text.match(/\((.+)\)/g)
            text = text.split(re)[0].split('\r\n                    ').join('')
        }
        console.log(text)
        setText(text)
        setRate(props.existingReview.rating)
        setGallery(props.existingReview.meta.gallery??[])
        let originalIDs = []
        props.existingReview.meta.gallery?.map(item=>{
            originalIDs.push(item.image_ID)
        })
        setGalleryOrigin(originalIDs)
    }
    const onChangeText = (text) =>{
        setText(text)
    }
    const onModalOpen = ()=>{
        setShowModal(true)
    }
    const onModalClose = () =>{
        setShowModal(false)
    }
    const onTextInputPress = () =>{
        onModalOpen()
        if(props.existingReview){
            setExistingReview()
        }
        setChosenReview(null)
    }
    const onAddImagePress = async () =>{
        // if(!gallery){setGallery([])}
        if(gallery?.length>4){return;}
        let res = await pickGallery()
        if(res){
            setGallery([...gallery, res])
        }
    }
    const onRating = (star) =>{
        setRate(Number(star)*2)
    }
    const onImagePress = (index) =>{
        Alert.alert('Remove Image', 'Are you sure to remove this image?',[
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },
            { text: "OK", onPress: () => onImageRemove(index) }
        ])
    }
    const onImageRemove = (index) =>{
        let tempGallery = [...gallery]
        tempGallery.splice(index, 1)
        setGallery(tempGallery)
    }
    const onPostPress = async () =>{
        if((!rate || rate === 0) && !chosenReview){
            alert('Please select a star')
            return
        }
        setPostLoading(true)
        let removedImages = null
        let newGallery = null
        if(props.existingReview && !chosenReview){
            let removedImageIDs = [...galleryOrigin]
            let newImages = []
            gallery.map(item=>{
                let index = removedImageIDs.indexOf(item?.image_ID)
                if(index > -1){//old image
                    removedImageIDs.splice(index, 1)
                }else{//new image
                    newImages.push(item)
                }
            })
            removedImages = removedImageIDs
            newGallery = newImages
        }else{
            newGallery = [...gallery]
        }
        // console.log(removedImages)
        // console.log(newGallery)
        let section
        if(chosenReview){
            if(editCommentId){
                section = 'commentUpdate'
            }else{
                section = 'commentInsert'
            }
        }else{
            if(props.existingReview){
                section = 'reviewUpdate'
            }else{
                section = 'reviewInsert'
            }
        }
        const res = await postReviewAxios({
            userId:props.parentId,
            text:text,
            rating: chosenReview?null: rate,
            parent: chosenReview?.id??null,
            section: section,
            postID: props.postID,
            existingReview: props.existingReview?.id??null,
            editCommentId: editCommentId,
            gallery:newGallery,
            removedImages:(removedImages && removedImages.length>0)? removedImages.join(','):null,
        })
        // console.log(res)
        setPostLoading(false)
        if(res.code === 200){
            if(section === 'reviewInsert' || section === 'reviewUpdate'){
                // alert('Thanks! Your review is sent to our server, you will be able to see your review once we approved')
                Alert.alert('Thank You.','Your comment is awaiting moderation.')
                onModalClose()
            }else{
                onModalClose()
                props.getReviews()
            }
        }else{
            alert(res.message)
        }
    }
    return (
        <View style={{backgroundColor:colors.lightgrey, padding:10, borderRadius:10, width:'100%', flexDirection:'row', alignItems:'center'}}>
            <ShadowCard style={{borderRadius:100, height:iconSize, width:iconSize, marginRight:10, backgroundColor:colors.white}}>
                <Image source={props.parent?.profileImg? {uri:props.parent.profileImg}:iconPin} style={{height:'100%', width:'100%', borderRadius:100}}/>
            </ShadowCard>
            <Pressable onPress={onTextInputPress} style={{flex:1}}>
                <NormalText numberOfLines={2} style={{color:colors.grey}}>{text || 'write a review'}</NormalText>
            </Pressable>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
                onRequestClose={onModalClose}
            >
                <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <Pressable style={{flex:1, backgroundColor:colors.opacityGrey}} onPress={onModalClose}/>
                    <View style={{backgroundColor:colors.white, padding:20, paddingBottom:40}}>
                        {
                            chosenReview?
                                <View style={{flexDirection:'row', alignItems:'center'}}>
                                    <Image source={{uri:chosenReview.profile_photo_url}} style={{height:imageSize, width:imageSize, borderRadius:100, marginRight:10}}/>
                                    <NormalText style={{color:colors.grey, flex:1}} numberOfLines={2} fontSize={12}>{chosenReview.text}</NormalText>
                                </View>:
                                <View style={{flexDirection:'row', alignItems:'center'}}>
                                    <NormalText font={'medium'} style={{marginRight:10}}>Rating</NormalText>
                                    <RatingStar button onRating={onRating} rating={rate/2}/>
                                    <NormalText font={'light'} fontSize={10} style={{color:colors.grey, marginLeft:10}}>{rate/2}.0/5.0</NormalText>
                                </View>
                        }

                        <TextInput
                            placeholder={chosenReview?'Reply to review':'Write a review'} multiline autoFocus
                            style={{width:'100%', backgroundColor:colors.lightgrey, padding:5, paddingHorizontal:10, borderRadius:10, marginVertical:10}}
                            onChangeText={onChangeText}
                            value={text}
                        />
                        <View style={{flexDirection:'row', alignItems:'center', marginTop:5}}>
                            {
                                chosenReview?null:
                                    <TouchableOpacity onPress={onAddImagePress} disabled={gallery?.length>4}>
                                        <MaterialCommunityIcons name={'image-plus'} color={gallery?.length>4?colors.grey:colors.black} size={imageSize}/>
                                    </TouchableOpacity>
                            }
                            <View style={{flex:1, flexDirection:'row'}}>
                                {
                                    gallery?.map((item, index)=>{
                                        return(
                                            <TouchableOpacity key={index} style={{marginLeft:10}} onPress={()=>onImagePress(index)}>
                                                <Image source={{uri:item.thumbnail?item.thumbnail:item}} style={{height:imageSize, width:imageSize}}/>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                            {/*<TouchableOpacity style={{backgroundColor:colors.yellow, padding:3, paddingHorizontal:10, borderRadius:5}} onPress={onPostPress}>*/}
                            {/*    <NormalText fontSize={12} style={{color:colors.white}}>POST</NormalText>*/}
                            {/*</TouchableOpacity>*/}
                            <IKidzButton variant={'primary'} onPress={onPostPress} style={{borderRadius:5 }} loading={postLoading}>
                                <NormalText fontSize={12} style={{color:colors.white}}>POST</NormalText>
                            </IKidzButton>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </View>
    );
}
// export default connect(mapState, mapDispatch, null, {forwardRef:true})(ReviewInput);
export default forwardRef(ReviewInput);