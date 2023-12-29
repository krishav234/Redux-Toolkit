import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB55FWQRl6nHKyB-r9n9ODXmpr8z-VZC8w",
  authDomain: "sign-up-6b9d5.firebaseapp.com",
  projectId: "sign-up-6b9d5",
  storageBucket: "sign-up-6b9d5.appspot.com",
  messagingSenderId: "292633186336",
  appId: "1:292633186336:web:daa77f14d8fbbe63adec45",
  measurementId: "G-6XZW7N6PVD"
};

export const app = initializeApp(firebaseConfig)
