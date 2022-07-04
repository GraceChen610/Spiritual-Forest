/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
  getFirestore, doc, addDoc, getDocs, getDoc, collection, updateDoc,
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
});

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(firebaseConfig);
export const storage = getStorage(firebaseConfig);
const db = getFirestore(firebaseConfig);

const firebaseStores = {
  // 讀取資料集
  async getData(collectionName) {
    const data = await getDocs(collection(db, collectionName));
    return data.docs;
  },

  // 讀取單個文件
  // eslint-disable-next-line consistent-return
  async getOneDoc(collectionName, collectionID) {
    const docRef = doc(db, collectionName, collectionID);
    const docSnap = await getDoc(docRef);
    // const data = docSnap.data();

    if (!docSnap.exists()) {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    } else {
      return docSnap;
    }
  },

  // 新增資料集
  async postdata(collectionName, content) {
    const docRef = await addDoc(collection(db, collectionName), {
      content,
    });
    console.log('Document written with ID: ', docRef.id);
  },

  // 寫入資料
  updateDoc(userId, contentObj) {
    const washingtonRef = doc(db, 'users', userId);
    updateDoc(washingtonRef, contentObj);
  },
};

export default firebaseStores;
