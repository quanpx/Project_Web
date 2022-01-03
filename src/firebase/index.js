// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCf1lApdfF-9iEGdZg0xItEuB9ytt5Bcc",
  authDomain: "happy-farmer-d747a.firebaseapp.com",
  projectId: "happy-farmer-d747a",
  storageBucket: "happy-farmer-d747a.appspot.com",
  messagingSenderId: "215142906166",
  appId: "1:215142906166:web:e6f0c3ef0d0c0aa3cf9b97",
  measurementId: "G-M6N7RRZJH4"
};

// Initialize Firebase
const firebaseApp= initializeApp(firebaseConfig);
const storage= getStorage(firebaseApp);

export default storage;