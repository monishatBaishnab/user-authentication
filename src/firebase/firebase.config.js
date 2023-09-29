// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyArp73LS9skST_U5lYGHtPSMfYoqdm6Gvg",
    authDomain: "user-authentication-f026c.firebaseapp.com",
    projectId: "user-authentication-f026c",
    storageBucket: "user-authentication-f026c.appspot.com",
    messagingSenderId: "227056874974",
    appId: "1:227056874974:web:5c2e5144ed31c12cb5194f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
export default auth;