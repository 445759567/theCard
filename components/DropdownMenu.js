import {ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import NormalText from "./normalText";
import {Menu, MenuItem, MenuDivider} from "react-native-material-menu";
import React from "react";
import {colors, windowHeight} from "../globalVariables";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {wpDataPreprocess} from "../functions";

const styles = StyleSheet.create({
    box:{
        width:'100%',
        // height:'100%',
        // borderWidth:1,
        borderRadius:10,
        // borderColor:colors.grey,
        padding:5,
        paddingVertical:10,
        paddingLeft:20,
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:colors.lightgrey
    },
    item:{
        width:'100%',
        margin:0,
        height:undefined,
        paddingVertical: 10,
        justifyContent: "center",
        // borderBottomWidth:1
    }
})
export const DropdownMenu = ({onShowCategoryMenu, showCategoryMenu, onHideCategoryMenu, items, onItemPress, containerStyle, placeHolder, placeHolderIcon}) =>{
    return(
        <View style={containerStyle||{}}>

                <Menu
                    visible={showCategoryMenu}
                    anchor={
                        <TouchableOpacity onPress={onShowCategoryMenu} style={styles.box}>
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                {placeHolderIcon}
                                <NormalText style={{marginLeft:20}}>{placeHolder}</NormalText>
                            </View>
                            <MaterialCommunityIcons name={showCategoryMenu? "chevron-up":"chevron-down"} size={24} color="black" />
                        </TouchableOpacity>
                    }
                    onRequestClose={onHideCategoryMenu} style={{ width:'90%'}}
                >
                    <ScrollView style={{maxHeight:windowHeight*0.3}}>
                        {
                            items.map((item, index)=>{
                                return(
                                    <View
                                        key={index}>
                                        <MenuItem
                                            onPress={()=>onItemPress(item)}
                                            style={styles.item}
                                        >
                                            {
                                                (item.icon || item.image)?
                                                    <View style={{width:40, alignItems:'flex-end'}}>
                                                        {wpDataPreprocess.getCategoryIcon(item, 20)}
                                                    </View>:null
                                            }
                                            <View style={{width:10}}/>
                                            <NormalText>{wpDataPreprocess.removeSymbols(item.label)}</NormalText>
                                        </MenuItem>
                                        <MenuDivider/>
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                </Menu>
        </View>
    )
}