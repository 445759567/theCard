import React from 'react';
import {TouchableOpacity} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import {colors} from "../globalVariables";

export default function IconButton({backgroundColor, iconColor, iconName, onPress, disabled, ...props}) {
    return (
        <TouchableOpacity style={{backgroundColor:backgroundColor, margin:5, borderRadius:50, padding:5, marginRight:10}} onPress={onPress} disabled={disabled}>
            <MaterialIcons name={iconName} size={24} color={disabled?colors.grey: iconColor} />
        </TouchableOpacity>
    );
}