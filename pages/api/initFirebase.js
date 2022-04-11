// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, updateDoc, getDoc, getDocs, arrayUnion, query, where, Timestamp, addDoc, arrayRemove } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWXw_HHoyu5rDJ1Ywi6HsQHWDhQjG0vD4",
  authDomain: "chips-chat.firebaseapp.com",
  projectId: "chips-chat",
  storageBucket: "chips-chat.appspot.com",
  messagingSenderId: "536394167628",
  appId: "1:536394167628:web:3317688fa6bf9877bb4be9",
  measurementId: "G-DCL85KNR5Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Deploy to Firebase Hosting
// firebase login
// firebase init
// firebase deploy

const db = getFirestore()

export const sendData = (value) => {
  const saveComment = async (value) => {
    console.log('sendData', value)
    const docRef = doc(db, "commentsData", `${value.Title}`); //doc(db, "collection", "document target");
    const docSnap = await getDoc(docRef);
    // console.log('fs', value)
  
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      await updateDoc(docRef, {
        userComment: arrayUnion(value)
      });
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      await setDoc(docRef, {
      userComment: [value]
    });
    }
  }
  saveComment(value)
}
