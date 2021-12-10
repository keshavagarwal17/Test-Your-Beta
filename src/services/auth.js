import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import dotenv from "dotenv";

dotenv.config();
const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};
const provider = new GoogleAuthProvider();

const app = initializeApp(config);
export const auth = getAuth(app);
export const signInWithGoogle = () => {
  return signInWithPopup(auth, provider)
    .then(async (result) => {
      const { user } = result;
      return user;
      // const beHost = process.env.REACT_APP_BACKEND_HOST;
      // const url = `${beHost}auth/register-with-google`;
      // await axios.post(url, {
      //   email: user.email,
      //   name: user.displayName,
      //   id: user.uid,
      // });
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
