// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyALExoAwjgddt3h-mrPC-L3iM175HksNmU",
    authDomain: "theboard-2b400.firebaseapp.com",
    projectId: "theboard-2b400",
    storageBucket: "theboard-2b400.appspot.com",
    messagingSenderId: "602182744060",
    appId: "1:602182744060:web:898d57feb8236d57f66479",
    measurementId: "G-417M411RQB"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);