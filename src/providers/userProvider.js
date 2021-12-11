import { useState, useEffect, createContext } from "react";
import { auth } from "../services/auth";
import {
  getFirestore,
  getDoc,
  doc
} from "firebase/firestore";
import { app } from "../services/firebase";
const db = getFirestore(app);

export const UserContext = createContext({
  info: { user: null, isLoading: true },
});

const UserProvider = (props) => {
  const [info, setInfo] = useState({ user: null, isLoading: true });
  const [userId, setUserId] = useState("");

  const fetchInfo = async () => {
    setInfo({
      ...info,
      isLoading: true,
    });
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("user is logged in");
      setInfo({
        user: {...docSnap.data(),uid:userId},
        isLoading: false,
      });
    } else {
      setInfo({
        user: null,
        isLoading: false,
      });
    }
  };

  useEffect(()=>{
    if(userId){
      fetchInfo();
    }
  },[userId])

  useEffect(() => {
    auth.onAuthStateChanged(async (person) => {
      if (person) {
        console.log(person);
        const { uid } = person;
        setUserId(uid);
      } else {
        setInfo({
          user: null,
          isLoading: false,
        });
      }
    });
  }, []);

  return (
    <UserContext.Provider value={{info, fetchInfo}}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
