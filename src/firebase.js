import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import {
  getFirestore, doc, addDoc, getDocs, getDoc, collection,
} from 'firebase/firestore';

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

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
// const db = getFirestore(app);
const db = getFirestore(firebaseConfig);

const firebaseStores = {
  // 讀取資料集
  async getData(collectionName) {
    const data = await getDocs(collection(db, collectionName));
    return data.docs;
  },

  // 讀取單個文件
  async getOneDoc(collectionName, collectionID) {
    const docRef = doc(db, collectionName, collectionID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
    // 尚未return
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }
  },

  // 新增資料集
  async postdata(collectionName, content) {
    const docRef = await addDoc(collection(db, collectionName), {
      content,
    });
    console.log('Document written with ID: ', docRef.id);
  },
};

export default firebaseStores;
