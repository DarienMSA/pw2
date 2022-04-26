import firebase from "firebase/compat/app";
import "firebase/compat/storage";

export const firebaseApp = firebase.initializeApp({
    "projectId": "gameview-app",
    "appId": "1:1028412698208:web:de3926ad2b3476d5d39d05",
    "storageBucket": "gameview-app.appspot.com",
    "locationId": "us-central",
    "apiKey": "AIzaSyAoLAmMFLIzswUbDO4IFQSkuSM-63mInUM",
    "authDomain": "gameview-app.firebaseapp.com",
    "messagingSenderId": "1028412698208"
});