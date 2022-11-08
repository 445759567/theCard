import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {Provider} from 'react-redux'
import Router from "./View/Router/View";
import {useFonts} from "expo-font";
import store from './store/'
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "./firebaseConfig";

export default function App() {

    const app = initializeApp(firebaseConfig);
    let [fontsLoaded] = useFonts({
        'Poppins-Regular': require('./assets/fonts/Poppins/Poppins-Regular.ttf'),
        'Poppins-Light': require('./assets/fonts/Poppins/Poppins-Light.ttf'),
        'Poppins-Medium': require('./assets/fonts/Poppins/Poppins-Medium.ttf'),
        'Poppins-Bold': require('./assets/fonts/Poppins/Poppins-Bold.ttf'),
        // 'Poppins-Italic': require('../assets/fonts/Poppins/Poppins-Italic.ttf'),
        'Poppins-LightItalic': require('./assets/fonts/Poppins/Poppins-LightItalic.ttf'),
        // 'Poppins-BoldItalic': require('../assets/fonts/Poppins/Poppins-BoldItalic.ttf'),
    });
    if(!fontsLoaded){
        return <View/>
    }
    return (
        <Provider store={store}>
            <NavigationContainer>
                    <Router/>
                    <StatusBar style="auto" />
            </NavigationContainer>
        </Provider>
    );
}

