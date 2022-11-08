import {getWPMecEventPrimaryImgUrl} from "../APIs/apiUrls";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {colors, listingTypeSlugs} from "../globalVariables";
import moment from "moment";
import {Image, View} from 'react-native'
import {getTranslationForDescription} from "./translate";
import { normalizeIconSize} from "./sizeNormalize";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {wpUser} from "../APIs/wordpress";

export const readCategories = (wpRes) =>{
    let main = []
    let sub = []
    wpRes.map(item=>{
        let name = item.description.split('\r').join('').split('\n').join('').split('_&amp;_').join(' & ')
        if(item.parent !== "0"){
            sub.push({
                // id: item.id,
                name: name,
                description: name,
                icon:item.icon,
                color:item.color,
                image: item.image,
                icon_type:item.icon_type,
                // posts: item._links['wp:post_type'],
                up:item.parent
            })
        }else{
            main.push({
                id: item.term_taxonomy_id,
                name: name,
                icon:item.icon,
                color:item.color,
                image: item.image,
                icon_type:item.icon_type,
                description: name,
                down:[]
            })
        }
    })
    sub.map(item =>{
        let mainIndex = main.findIndex(obj => obj.id === item.up)
        main[mainIndex].down.push(item)
    })
    // console.log(main)
    return main
}
export const getCategoryIcon = (item, iconSize) =>{
    if(!item || (!item.icon && (!item.image || item.image.length < 1))){
        return(<View/>)
    }
    let size = normalizeIconSize(iconSize)
    if(item.icon_type === 'image'){ //if using image
        if(!item.image || item.image.length <1){return <View/>}
        return(<Image source={{uri:item.image}} style={{width:size, height:size}}/>)
    }else{  // if using icon
        // console.log(item)
        if(item.icon.indexOf('mi ') === 0){
            return <MaterialIcons name={item.icon.split(" ")[1].split("_").join("-")} size={size} color={item.color || colors.black}/>
        }else if(item.icon.indexOf('fa ')===0){
            return <FontAwesome5 name={item.icon.split(" ")[1].split('fa-')[1]} size={size} color={item.color || colors.black}/>
        }else if(item.icon.indexOf('mci ')===0){
            return <MaterialCommunityIcons name={item.icon.split(" ")[1].split("_").join("-")} size={size} color={item.color || colors.black}/>
        } else{
            return <MaterialIcons name={item.icon} size={size} color={item.color}/>
        }
    }
}
export const getClassTermDateRange = (terms) =>{
    function sortRule(a,b){
        return moment(a.start).unix() - moment(b.start).unix()
    }
    const sortedTerms = terms.sort(sortRule)
    let begin = moment().format('YYYY-MM-DD')
    let end = moment(sortedTerms[terms.length-1].end).format('YYYY-MM-DD')
    for (let i=0; i<sortedTerms.length; i++){
        if(moment(sortedTerms[i].start).isBefore(moment()) && moment(sortedTerms[i].end).isSameOrAfter(moment())){
            begin = moment(sortedTerms[i].start).format('YYYY-MM-DD')
            break
        }
    }
    return [begin, end]
}
export const getLogoImg = (place) =>{
    if(!place || !place.logo) return
    let image = place.logo[0].thumbnail
    return(image)
}
export const getCoverImg = (string) =>{
    if(!string) return
    return(string)
}
export const getGalleryImg = (item) =>{
    if(!item) return
    let result = []
    result.push({imageData: getCoverImg(item.cover[0]?.large || null)})
    item.gallery.map(item=>{
        result.push({imageData: item.large})
    })
    return result
}
export const removeSymbols = (string) =>{
    return string.split('&amp;').join('&').split('_').join(' ').split('<strong>').join('').split('</strong>').join('')
}
export const getMerchantDeals = (dealDetails) =>{
    let result = {}
    let array = dealDetails.split('\r\n\r\n')
    array.map(item=>{
        let content = item.split('.')
        result[content[0]] = content[1].split('|')
    })
    return(result)
}
export const getReviewsTree = (reviews) =>{
    const sortRule = (a,b) =>{
        return(moment(b.time).unix()-moment(a.time).unix())
    }
    // const arrayToTree = (arr, parent = "0") =>
    //     arr.filter(item => item.parent === parent)
    //         .map(child => ({ ...child, children: arrayToTree(arr,
    //                 child.id) }));
    // return (arrayToTree(reviews).sort(sortRule))
    return reviews.sort(sortRule)
}
export const goToDetailByLink = (data, onNavToDetailPage) =>{
    // console.log(data)
    if(data.slice(0,5) === 'https'){
        console.log('The QR code is a web link! ' + data)
        // navigate.goBack()
        try {
            const info = data.split('/listing/')[1].split('/')
            const listingType = info[0]
            const slug = info[1]
            // console.log(info)
            switch (listingType) {
                case listingTypeSlugs.class:
                    onNavToDetailPage('learningDetailPage', 'class', slug)
                    break
                case listingTypeSlugs.article:
                    break
                case listingTypeSlugs.term:
                    break
                case listingTypeSlugs.place:
                    onNavToDetailPage('placeToGoDetailPage', 'place', slug)
                    break
                case listingTypeSlugs.merchant:
                    break
                case listingTypeSlugs.event:
                    onNavToDetailPage('eventDetailPage', 'event', slug)
                    break
                default:
                    break
            }
        }catch (e) {
            // console.log(e)
        }
    }else{
        // console.log('invalid qr code')
    }
}
export const getSessions = (timePeriod) =>{
    if(!timePeriod) return []
    let sessions = []
    Object.entries(timePeriod).forEach(([key, value])=>{
        if(moment(value.repeat_end).isBefore(moment())){    //if repeat end date is passed, continue to next loop
            return
        }
        let frequency
        let startTime = moment(value.start_date).unix()
        let duration = moment(value.end_date).unix() - startTime
        let repeatEnd = moment(value.repeat_end).unix()
        let current
        switch (value.repeat_unit) {
            case 'NONE':
                // console.log('session is not recurring')
                sessions.push({
                    startTime:moment(value.start_date).unix(),
                    endTime:moment(value.end_date).unix()
                })
                // console.log(sessions)
                break
            case 'DAY':
                // console.log('session frequency is based on day')
                frequency = value.frequency*24*60*60
                current = startTime
                while (current < repeatEnd){
                    if(moment((current+duration)*1000).isSameOrAfter(moment())){
                        sessions.push({
                            startTime:current,
                            endTime:current + duration,
                        })
                    }
                    current = current + frequency
                }
                break
            case 'MONTH':
                // console.log('session frequency is based on month')
                current = startTime
                while (current < repeatEnd){
                    if(moment((current+duration)*1000).isSameOrAfter(moment())){
                        sessions.push({
                            startTime:current,
                            endTime:current + duration,
                        })
                    }
                    let currentMoment = moment(current*1000)
                    current = currentMoment.month(currentMoment.month()+Number(value.frequency)).unix()
                }
                break
            default:
                // console.log('hit default sessions, default session only return the first date')
                sessions.push({
                    startTime:moment(value.start_date).unix(),
                    endTime:moment(value.end_date).unix()
                })
                // console.log(sessions)
                break
        }
    })
    function sortRule(a,b){
        return a.startTime-b.startTime
    }
    return sessions.sort(sortRule)
}
export const getDateRange = (date) =>{
    if(!date) return {start:0, end:0}
    // "date": {
    //     "53": {
    //         "start_date": "2022-06-12 13:00:00",
    //             "end_date": "2022-06-12 14:00:00",
    //             "frequency": "14",
    //             "repeat_unit": "DAY",
    //             "repeat_end": "2023-06-12 23:59:59",
    //             "days": -3
    //     },
    //     "54": {
    //         "start_date": "2022-06-11 03:00:00",
    //             "end_date": "2022-06-12 16:00:00",
    //             "frequency": "14",
    //             "repeat_unit": "DAY",
    //             "repeat_end": "2023-06-12 23:59:59",
    //             "days": -4
    //     }
    // },
    // console.warn(date)
    let start = moment().month(99)
    let end = moment().month(-1)
    let foundTerm = false
    Object.entries(date).forEach(([key, value])=>{
        const day = moment(value.end_date).day()      //session weekday
        let differenceDay = day - moment(value.repeat_end).day()         //week day difference between repeat end and start date
        differenceDay = differenceDay % value.frequency
        let endDate
        if(!value.repeat_end){ //upcoming terms for learning
            if(!foundTerm && moment().isBefore(value.end_date)){
                if(moment().isAfter(value.start_date)){
                    foundTerm = true
                    start = value.start_date
                    end = value.end_date
                    return ({start:start, end:end})
                }
                if(moment(value.start_date).isBefore(moment(start))){
                    end = value.end_date
                    start = value.start_date
                }
            }
            // endDate = moment(value.end_date).hour(12)
        }else{ //for events? not sure
            endDate = moment(value.repeat_end).hour((differenceDay)*24)
            if(moment(endDate).isAfter(end)){
                end = endDate
            }
            if(moment(value.start_date).isBefore(start)){
                start = moment(value.start_date)
            }
        }
        // console.log(endDate)
        // console.warn(endDate)
    })
    // console.warn(end)
    return({start:start, end:end})
}
export const getWorkHours = (hours) =>{
    let result = []
    let timezone
    let a  =  hours.replace(/s:[0-9]+:/ig, '').replace(/a:[0-9]:/ig, '').replace(/i:[0-9]+;/ig, '').replace(/"from";/ig, '"from":').replace(/"status";/ig, '"status":').replace(/"timezone";/ig, '"timezone":').replace(/"to";/ig, '"to":').replace(/"(Mon|Tues|Wednes|Thurs|Fri|Satur|Sun)day";/ig, /"day":/).replace(/\//ig,' ')
    // a = a.split(";")
    // console.log(a)
    let splitted = a.split('"timezone":')
    timezone = splitted[1].split('"')[1]
    result.push(timezone)
    splitted = splitted[0].split('"day":')
    splitted.slice(1).map((item, index)=>{
        let formatted = item.split(';').join(',').replace(/\{"from"/i, '"from"').replace(/,}}/, '}')
        // console.log(formatted)
        try {
            let json = JSON.parse(formatted)
            const from = json.from.split(':')
            const to = json.to.split(':')
            json.fromTime = moment().day(index+1).hours(Number(from[0])).minutes(Number(from[1]))
            json.toTime = moment().day(index+1).hours(Number(to[0])).minutes(Number(to[1]))
            // console.log(json)
            result.push(json)
        }catch (e) {
            console.log('missing work hours')
            result.push(null)
        }
    })
    return result
}
export const getAuthorAvatar = (author) =>{
    let url = author.avatar_urls["24"]
    if(!url) return
    if(url.indexOf("https://secure.gravatar.com") === 0){
        return author.avatar_urls["24"]
    }else{
        return getWPMecEventPrimaryImgUrl + author.avatar_urls["24"]
    }
}
export const getPostTags = (post) =>{
    const terms = post._embedded['wp:term']
    let result = []
    terms.map(item=>{
        if(item[0].taxonomy === 'post_tag'){
            result.push(item[0].name)
        }
    })
    return result
}
export const readText = async (text, language) =>{
    text = text.split('&nbsp;').join(" ").split('&amp;').join('&')
    const handleUnderLine = (string) =>{
        let array = string.split('<span>')
        let result = []
        array.map((item, index)=>{
            if(index%2===0){    //not italic
                result.push({text: item, underLine:false})
            }else{  //italic
                result.push({text:item, underLine:true})
            }
        })
        return(result)
    }
    const handleItalic = (string) =>{
        let array = string.split('<em>')
        let result = []
        array.map((item, index)=>{
            if(index%2===0){    //not italic
                handleUnderLine(item).map(_item=>{
                    _item.italic = false
                    result.push(_item)
                })
            }else{  //italic
                handleUnderLine(item).map(_item=>{
                    _item.italic = true
                    result.push(_item)
                })
            }
        })
        return(result)
    }
    const handleBold = (string) =>{
        let result = []
        let tempString = string.split('</strong>').join('<strong>')
        tempString = tempString.split('</em>').join('<em>')
        tempString = tempString.split('</ul>').join('<ul>')
        tempString = tempString.replace(/<\/?span.*?>/ig, '<span>')
        let splitted = tempString.split('<strong>')
        splitted.map((item, index)=>{
            if(index%2===0){    //not bold
                handleItalic(item).map(_item=>{
                    _item.bold = false
                    result.push(_item)
                })
            }else{  //bold
                handleItalic(item).map(_item=>{
                    _item.bold = true
                    result.push(_item)
                })

            }
        })
        // console.log(result)
        return(result)
    }
    const handlePoints = () =>{
        let result = []
        handleBold(text).map(item=>{
            if(item.text.indexOf('<ul>') < 0){
                item.point = false
                result.push(item)
            }else{
                let splitted = item.text.split('<ul>')
                splitted.map((_item, _index)=>{
                    if(_index === 1 || _index === splitted.length-1){       //add a blank line before first point
                        result.push({bold:item.bold, italic:item.italic, underLine:item.underLine, text:'\n', point:false})
                    }
                    if(_index%2===0){//no point
                        result.push({bold:item.bold, italic:item.italic, underLine:item.underLine, text:_item, point:false})
                    }else{ //with point
                        _item = _item.split('</li>').join('<li>')
                        _item.split('<li>').map((__item, __index)=>{
                            if(__index%2 !== 0){
                                result.push({bold:item.bold, italic:item.italic, underLine:item.underLine, text:__item, point:true})
                            }
                        })
                    }
                })
            }
        })
        // console.log(result)
        return result
    }

    return await getTranslationForDescription(handlePoints(), language)
}

export const checkActivityIsFavorite = (activityID, bookmarkList) =>{
    return bookmarkList.indexOf(Number(activityID)) > -1
}
export const onBookmarkPress = async (bookmarkList, activityID, set, nav, userID) =>{
    // console.log(bookmarkList)
    if(!userID){
        nav.navigate('loginRequestScreen')
        return
    }
    let temp = [...bookmarkList]
    let index = temp.indexOf(Number(activityID))
    if(index > -1){
        temp.splice(index, 1)
        //call api to add or remove bookmark using userID and activityID
        await wpUser.updateBookmarkAxios('remove', userID, activityID)
        console.log('remove activity '+activityID+ ' from user '+userID+"'s bookmark list")
    }else{
        temp.push(Number(activityID))
        //call api to add or remove bookmark using userID and activityID
        await wpUser.updateBookmarkAxios('add', userID, activityID)
        console.log('save activity '+activityID+ ' to user '+userID+"'s bookmark list")
    }
    set(temp)
}
export const getConditionsLink = (string) =>{
    let array = string.split('"')
    let result
    array.map(item=>{
        if(item.indexOf('http') > -1){
            result = item
        }
    })
    return result
}