import { initializeApp } from 'firebase/app'; 
import { getFirestore } from 'firebase/firestore'; 

const firebaseConfig = {
    apiKey: "AIzaSyAUpWa-lTgtW6dOiH6DS5yiEhyIMCO3ptc",
    authDomain: "hra-coventry.firebaseapp.com",
    projectId: "hra-coventry",
    storageBucket: "hra-coventry.appspot.com",
    messagingSenderId: "334587329321",
    appId: "1:334587329321:web:9a3940c83e927d931b1538",
    measurementId: "G-K4FFMVKQLZ"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };