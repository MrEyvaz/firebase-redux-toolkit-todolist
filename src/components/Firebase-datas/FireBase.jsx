import { initializeApp } from 'firebase/app'; 
import { getFirestore } from 'firebase/firestore'; 

const firebaseConfig = {
    //Api_Key
    authDomain: "hra-coventry.firebaseapp.com",
    projectId: "hra-coventry",
    storageBucket: "hra-coventry.appspot.com",
    messagingSenderId: "334587329321",
    //Api_Id
    measurementId: "G-K4FFMVKQLZ"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };