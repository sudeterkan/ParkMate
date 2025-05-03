import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyArUzQrrYLrOkalCLNqB0YbrohQvmxI5-g",
  authDomain: "parkmate-635ef.firebaseapp.com",
  projectId: "parkmate-635ef",
  storageBucket: "parkmate-635ef.appspot.com",
  messagingSenderId: "230204793348",
  appId: "1:230204793348:web:dea53005857002b0704b51",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
