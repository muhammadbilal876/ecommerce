import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBdZXoNd-VsZy6mBQKVK3H0dLwVXo6xDeI",
  authDomain: "rimberio-watches-store.firebaseapp.com",
  projectId: "rimberio-watches-store",
  storageBucket: "rimberio-watches-store.appspot.com",
  messagingSenderId: "1061382886913",
  appId: "1:1061382886913:web:31e0764b09e145434cd200",
  measurementId: "G-BGN6FBFRNP"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);

export{auth, analytics, firestore}