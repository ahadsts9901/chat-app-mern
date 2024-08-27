import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDDkH9pqIcdWmRlXHdyC2G0z0Lhlej5dCw",
    authDomain: "links-sharing-b9c2a.firebaseapp.com",
    projectId: "links-sharing-b9c2a",
    storageBucket: "links-sharing-b9c2a.appspot.com",
    messagingSenderId: "606062782904",
    appId: "1:606062782904:web:c13b74d910a35e9336c74d",
    measurementId: "G-0ZCEWD5WWJ"
};

export const app = initializeApp(firebaseConfig);