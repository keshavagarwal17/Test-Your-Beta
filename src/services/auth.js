import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import {useContext} from 'react'
import {app} from './firebase'
import {
  getFirestore,
  getDoc,
  setDoc,
  doc,
  updateDoc
} from "firebase/firestore";
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export const auth = getAuth(app);
export const signInWithGoogle = () => {
  return signInWithPopup(auth, provider)
    .then(async (result) => {
      const { user } = result;
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if(!docSnap.exists()){
        setDoc(doc(db, "users", user.uid), {
          name:user.displayName,
          email:user.email
        })
      }
      return user;
    })
    .catch((error) => {
      // Handle Errors here.
      // const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      // const { email } = error;
      // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
    });
};

export const updateUserInfo = (data,id)=>{
  const userRef = doc(db, "users", id);

  // Set the "capital" field of the city 'DC'
  return updateDoc(userRef, data);
}

export const signOutFromGoogle = ()=>{
  
  signOut(auth).then(() => {
    console.log("Sign-out successful")
  }).catch((error) => {
    // An error happened.
  });
}