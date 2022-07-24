/* eslint-disable no-console */
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import {
  getFirestore, doc, addDoc, getDocs, getDoc, collection, updateDoc, setDoc, query, where,
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

export const firebaseConfig = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
});

export const auth = getAuth(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(firebaseConfig);
export const storage = getStorage(firebaseConfig);
export const db = getFirestore(firebaseConfig);

const firebaseStores = {
  async getData(collectionName) {
    const data = await getDocs(collection(db, collectionName));
    return data.docs;
  },

  // eslint-disable-next-line consistent-return
  async getOneDoc(collectionName, collectionID) {
    const docRef = doc(db, collectionName, collectionID);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.log('No such document!');
    } else {
      return docSnap;
    }
  },

  async postdata(collectionName, content) {
    const docRef = await addDoc(
      collection(db, collectionName),
      content,
    );
    console.log('Document written with ID: ', docRef.id);
  },

  addUser(uid, content) {
    setDoc(doc(db, 'users', uid), {
      content,
    });
  },

  updateDoc(userId, contentObj) {
    const washingtonRef = doc(db, 'users', userId);
    updateDoc(washingtonRef, contentObj);
  },

  async getArticles(collect, uid) {
    const q = query(
      collection(db, collect),
      where('user_id', '==', uid),
    );
    const querySnapshot = await getDocs(q);
    const myArticles = querySnapshot.docs.map((articlesdoc) => articlesdoc.data());
    return myArticles;
  },
};

export default firebaseStores;
