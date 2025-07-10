// firebase.js
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDMLCrIhyyOsfkKr6oXE0JOMiSGOiaIL8k",
  authDomain: "verify-otp-6ea34.firebaseapp.com",
  projectId: "verify-otp-6ea34",
  storageBucket: "verify-otp-6ea34.appspot.com", // ✅ Sửa lại `.app` thành `.appspot.com`
  messagingSenderId: "16559387067",
  appId: "1:16559387067:web:da433fa77a8557fdb9949e",
  measurementId: "G-XF3FHGL92V"
};

// ✅ Tránh lỗi khi hot reload / gọi lại nhiều lần
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
