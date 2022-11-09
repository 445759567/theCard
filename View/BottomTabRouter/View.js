import React, {useEffect, useState} from 'react';
import {View} from "react-native";
import {connect} from "react-redux";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import UCenter from "../UCenter/View";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CardsTab from "../CardsTab/View";

const Tab = createBottomTabNavigator()
function BottomTabRouter({...props}) {
    const [value, setValue] = useState(0)
    useEffect(() => {
        // console.log('hello')
    }, []);
    return (
        <View style={{flex:1}}>
            <Tab.Navigator>
                <Tab.Screen
                    name={'cardStack'}
                    options={({navigation})=>({
                        tabBarLabel: 'Cards',
                        tabBarLabelStyle:{fontFamily:'Poppins-Regular'},
                        // tabBarIcon: ({focused}) => (
                        //     focused? <Image source={pinc} style={{height: 27, width: 27}}/>:<Image source={pin} style={{height: 27, width: 27}}/>
                        // ),
                        tabBarIcon:({color, size}) =>(
                            <MaterialCommunityIcons name={'cards'} color={color} size={size}/>
                        ),
                        title: 'Board',
                        // headerMode: 'none',
                        headerStyle: {
                            // height: 0,
                        },
                        // tabBarActiveTintColor: colors.black
                    })}
                >
                    {(props) => <CardsTab {...props} />}
                </Tab.Screen>
                <Tab.Screen
                    name={'uCenter'}
                    options={({navigation})=>({
                        tabBarLabel: 'Me',
                        tabBarLabelStyle:{fontFamily:'Poppins-Regular'},
                        // tabBarIcon: ({focused}) => (
                        //     focused? <Image source={pinc} style={{height: 27, width: 27}}/>:<Image source={pin} style={{height: 27, width: 27}}/>
                        // ),
                        tabBarIcon:({color, size}) =>(
                            <MaterialCommunityIcons name={'account'} color={color} size={size}/>
                        ),
                        title: 'User Center',
                        // headerMode: 'none',
                        headerStyle: {
                            // height: 0,
                        },
                        // tabBarActiveTintColor: colors.black
                    })}
                >
                    {(props) => <UCenter {...props} />}
                </Tab.Screen>
            </Tab.Navigator>
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
export default connect(mapState, mapDispatch)(BottomTabRouter);