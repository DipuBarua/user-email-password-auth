// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDR1-PF44WUUjwjfmdISVYvg2o5ASO6K0s",
    authDomain: "user-email-password-auth-3843a.firebaseapp.com",
    projectId: "user-email-password-auth-3843a",
    storageBucket: "user-email-password-auth-3843a.appspot.com",
    messagingSenderId: "442243386063",
    appId: "1:442243386063:web:6acacd226560ff2e9905ba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;