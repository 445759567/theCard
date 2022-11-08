import React, {useState} from 'react';
import {Image, Modal, Pressable, TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";
import NormalText from "./normalText";
import {colors} from "../globalVariables";
import moment from "moment";
import RatingStar from "./RatingStar";
import {StatusBar} from "expo-status-bar";
import ImageViewer from "react-native-image-zoom-viewer";
import IKIDZLoading from "./ikidzLoading";
import noImage from '../assets/lightGreyBackground.png'

//review for tree
// const ReviewItem = ({review}) =>{
//     return(
//         <View>
//             <NormalText>{review.author}</NormalText>
//             <NormalText>{review.content}</NormalText>
//             {
//                 (review.children && review.children.length>0)?
//                     <View style={{marginLeft:10}}>
//                         {
//                             review.children.map((item, index)=>{
//                                 return(
//                                     <ReviewItem review={item} key={index}/>
//                                 )
//                             })
//                         }
//                     </View>:null
//             }
//         </View>
//     )
// }
const ReviewItem = ({review, list, onImagePress, onReplyPress, onEditPress, parentId}) =>{
    const parent = list.filter(e=>e.id === review.parent)[0]
    return(
        <View style={{borderBottomWidth:1, marginHorizontal:20, paddingVertical:20, borderColor:colors.lightgrey}}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <Image source={{uri:review.profile_photo_url}} style={{width:50,height:50, marginRight:10, borderRadius:100}}/>
                <View style={{flex:1}}>
                    <NormalText numberOfLines={1}>{review.author_name}</NormalText>
                    <NormalText font={'lighter'} numberOfLines={1} style={{color:colors.grey}}>{(typeof review.time)==='number'?moment(review.time*1000).format('DD/MM/YYYY LT') : moment(review.time).format('DD/MM/YYYY LT')}</NormalText>
                </View>
                {
                    review.rating?
                        <View>
                            <RatingStar rating={review.rating/2} starSize={14}/>
                        </View>:null
                }
            </View>
            <View style={{marginLeft:60}}>
                {
                    (review.parent && review.parent !== "0")?
                        <View style={{borderLeftWidth:3, borderColor:colors.grey, paddingLeft:5, marginVertical:5}}>
                            <NormalText style={{color:colors.grey}} numberOfLines={2}>{parent.text}</NormalText>
                        </View>:null
                }
                <NormalText numberOfLines={5}>{review.text}</NormalText>
                <View style={{flexDirection:'row', marginVertical:5}}>
                    {
                        review.meta.gallery?.slice(0,3)?.map((image, imageIndex)=>{
                            return(
                                <Pressable key={imageIndex} onPress={()=>{onImagePress(review, imageIndex)}} style={{marginRight:5}}>
                                    <Image source={{uri:image.thumbnail}} style={{width:80, height:80}}/>
                                </Pressable>
                            )
                        })
                    }
                </View>
                <View style={{flexDirection:'row', justifyContent:'flex-end'}}>

                    {
                        (review.parent !== "0" && Number(review.author_id) === parentId) ?
                            <TouchableOpacity style={{marginRight:10}} onPress={()=>onEditPress(review, parent)}>
                                <NormalText fontSize={12} font={'medium'}>Edit</NormalText>
                            </TouchableOpacity>:null
                    }
                    <TouchableOpacity style={{}} onPress={()=>onReplyPress(review)}>
                        <NormalText fontSize={12} font={'medium'}>Reply</NormalText>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
function WPReviews({reviewTree, onReplyPress, onEditPress, ...props}) {
    const [showModal, setShowModal] = useState(false)
    const [gallery, setGallery] = useState([])//selected gallery
    const [imageIndex, setImageIndex] = useState(null)

    const onImagePress = (review, _imageIndex) =>{
        setGallery(review.meta.gallery)
        setImageIndex(_imageIndex)
        onModalOpen()
    }
    const onModalOpen = ()=>{
        setShowModal(true)
    }
    const onModalClose = () =>{
        setShowModal(false)
    }
    return (
        <View style={[{backgroundColor:colors.white, width:'100%', flex:1}, props.style]}>
            {
                reviewTree.map((item, index)=>{
                    return(
                        <ReviewItem review={item} key={index} list={reviewTree} onImagePress={onImagePress} onReplyPress={onReplyPress} onEditPress={onEditPress} parentId={props.parentId}/>
                    )
                })
            }
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
                onRequestClose={onModalClose}
            >
                <View style={{flex:1}}>
                    <StatusBar hidden/>
                    <ImageViewer
                        imageUrls={gallery.map(obj =>{return({url: obj.large})})}
                        index={imageIndex}
                        saveToLocalByLongPress={false}
                        onCancel={onModalClose} enableSwipeDown
                        onClick={onModalClose}
                        enablePreload
                        loadingRender={()=>{return <IKIDZLoading/>}}
                        failImageSource={noImage}
                    />
                </View>
            </Modal>
        </View>
    );
}
const mapState = (state) => {
    return{
        wording: state.account.wording,
        parentId: state.account.parentId,
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
export default connect(mapState, null)(WPReviews);