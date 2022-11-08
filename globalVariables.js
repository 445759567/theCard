import React from "react";
import {Dimensions} from "react-native";
import {createNavigationContainerRef} from "@react-navigation/native";
export const GOOGLE_PACES_API_BASE_URL = 'https://maps.googleapis.com/maps/api/place'
export const navigationRef = createNavigationContainerRef()
export const securityStoreLanguageKey = "language"
export const securityStoreLanguageENG = "en"
export const securityStoreLanguageCN = "zh"
export const securityStoreLanguageKR = "ko"
export const iKidzCalendarTitle = 'iKidz Go'
export const iKidzEventCalendarTitle = 'iKidz Event'
const {width, height} = Dimensions.get('window')
export const windowWidth=width
export const windowHeight=height
export const AndroidFontFamily = 'Roboto'
export const IOSFontFamily = null
export const imageRadio = 16/9
export const albumName = 'iKidz Go'
export const logoWidth = windowWidth*0.16   //used in detail page logo
export const eventFilter ={
    location:null,
    coordinate:null,
    sortBy:0,
    dateRange: 3,
    customDateStart:null,
    customDateEnd:null,
    price:0,
    category:100,
}
export const ptgReviews = {
    reviews:[],
    rating:0,
    ratingCount:0
}
export const listingTypeSlugs = {
    merchant:'vendor',
    term:'term',
    class:'learning',
    event:'event',
    article:'article-listing',
    place:'place'
}
export const reminderOptions = [
    {count:null, id:0, label:'None'},
    {count:-30, id:1, label:'30 mins'},
    {count:-60, id:2, label:'60 mins'},
    {count:-180, id:3, label:'3 hours'},
    {count:-360, id:4, label:'6 hours'},
    {count:-60*12, id:5, label:'12 hours'},
]
export const colors={
    green:'#2ECC71',
    opacityGreen:'rgba(46, 204, 113, 0.7)',
    red:'red',
    yellow:'rgb(251, 213, 4)',
    yellow1:'rgba(248,217,75,0.89)',
    lightyellow: 'rgba(251, 213, 4, 0.5)',
    alertYellow:'rgba(246,210,42,0.89)',
    lightblue:'#E2F3FD',
    blue: '#109CF1',
    lightgreen: 'lightgreen',
    lightgrey:'#f6f5f5',
    grey:'#9D9D9D',
    grey1:'#cbcaca',
    grey2:'rgba(203,202,202,0.71)',
    white:'white',
    black:'#6b6b6b',
    lightdealyellow:'#FFFBE2',
    primaryhalfblue:'rgba(35, 133, 197, 0.7)',
    primaryblue: 'rgba(35, 133, 197, 0.85)',
    warnOrange:'#f75f1e',
    warnOrangeHalf:'rgba(247, 95, 30, 0.7)',
    moneyOrange:'#d27b4b',
    opacityGrey:'rgba(107, 106, 106, 0.75)',
    opacityHalfGrey:'rgba(107, 106, 106, 0.5)',
    opacityWhite:'rgba(255,255,255,0.9)',
    opacityHalfWhite:'rgba(255,255,255,0.7)',
    funClassBlue: '#e2f3fd',
    funClassTextBlue:'#3a59e9',
    holidayGreen: '#daf5e6',
    holidayTextGreen: '#7cb832',
    eventsOrange:'#f7f2e3',
    eventsTextOrange:'#e49f64',
    under5Red:'#f6e7e2',
    under5TextRed:'#d27b4b',
    dividerGrey:'rgba(222,222,222,0.75)'
}
export const locationInUse = {
    CURRENT: 'CRT',
    AUCKLAND: 'AKL',
    QUEENS_TOWN: 'ZQN'
}
export const cities = {
    CRT:{
        "city": "Current",
        "name": "Current Location"
    },
    AKL: {
        "name": "Auckland",
        "city": "Auckland",
        "timestamp":1623038816976,
        "mocked":false,
        "coords": {
            "altitude":102.43644424023624,
            "heading":0,
            "altitudeAccuracy":3,
            "latitude":-36.848450,
            "speed":0,
            "longitude":174.762192,
            "accuracy":11.479000091552734
        }
    },
    ZQN: {
        "city": "Queenstown",
        "name": "Queenstown",
        "timestamp":1623038816976,
        "mocked":false,
        "coords": {
            "altitude":102.43644424023624,
            "heading":0,
            "altitudeAccuracy":3,
            "latitude":-45.0327,
            "speed":0,
            "longitude":168.658,
            "accuracy":11.479000091552734
        }
    },
}
export const detailPageDescriptionLength = 200
export const resizeImageHeight = 350
export const imageSizeLimit = 350000
export const SECURITY_STORE_VERSION = 'currentVersion'
export const categories = ['Fun Class', 'Holiday Program', 'Interesting Events', 'Kids Under 5']
export const days= ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
export const genders = ['Boy', 'Girl', 'Other', 'Prefer Not To Say']
export const searchType = ['Activity', 'Company', 'Term']
export const eventsFilter = {
    sortBy: ['Recommended Events', 'Nearby Events', 'Events Coming Soon'],//first is popular events
    date: ['Today', 'Tomorrow', 'This Week', 'This Weekend', 'This Month', 'Next Month'],
    // price: ['Free', 'Under $50', 'Above $50'],
    price: ['Free', 'Paid'],
    category: ['All', 'Competition', 'Concert', 'Entertainment', 'Movie', 'Exhibition']
}
//value keys for filter date menu
export const dateRanges = {
    TODAY: 'today',
    TOMORROW : 'tomorrow',
    THIS_WEEK : 'thisWeek',
    THIS_WEEKEND : 'thisWeekend',
    THIS_MONTH : 'thisMonth',
    NEXT_MONTH : 'nextMonth',
    CUSTOM: 'customize'
}
export const NOT_AUTH_MESSAGE = 'user not sign in'
export const emptyListStructure = {
    empty:true,
    data:[]
}
export const unLoadListStructure = {
    empty:false,
    data:[]
}
export const placeToGoFilter = {
    activityType:'ptg',
    feature:0,
    category:null,
    type:'both',
    categoryName:'',
    start:'now',
    days:14,
    lng:null,
    lat:null,
}
export const enrolStatus = [
    {
        text:'Pending Approval',
        color: colors.primaryblue
    },
    {
        text:'Pending Payment',
        color: colors.primaryblue
    },
    {
        text:'Disapproved',
        color: colors.warnOrange
    },
    {
        text:'Confirmed',
        color: colors.green
    },
    {
        text:'Cancelled',
        color: colors.warnOrange
    },
    {
        text:'Not Ordered',
        color: colors.warnOrange
    }
]

