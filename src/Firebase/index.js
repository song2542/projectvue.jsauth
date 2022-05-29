import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDZQXeUR5-dWxh2Z5OlJnOUFm2DMv4x-_s",
  authDomain: "vue-auth-project-e170b.firebaseapp.com",
  projectId: "vue-auth-project-e170b",
  storageBucket: "vue-auth-project-e170b.appspot.com",
  messagingSenderId: "649151067168",
  appId: "1:649151067168:web:57b8a39441f4e55672b845"
};

const fb = initializeApp(firebaseConfig);
const db = getFirestore(fb);
const storage = getStorage(fb);
const studentCollection = collection(db, "students");
const companyCollection = collection(db, "companys");
const teacherCollection = collection(db, "teacherProfile");
const auth = getAuth(fb);

export { auth,studentCollection, companyCollection, teacherCollection, db, fb ,storage };

