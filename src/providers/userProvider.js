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
  let tem = "HELLO"
  console.log("from the top of file",userId);

  const fetchInfo = async (a) => {
    setInfo({
      ...info,
      isLoading: true,
    });
    console.log("flag",a,tem);
    console.log("userId",userId)
    let docRef,docSnap;
    if(userId){
      console.log("going for docRef")
      docRef = doc(db, "users", userId);
      docSnap = await getDoc(docRef);
    }
    if (userId && docSnap.exists()) {
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
    const temFun = async()=>{
      console.log("are value change ho gyi",userId)
      if(userId){
        console.log("calling from fetchInfo")
        await fetchInfo(1);
      }
    }
    temFun();
  },[userId])

  useEffect(() => {
    auth.onAuthStateChanged(async (person) => {
      console.log("state change")
      if (person) {
        console.log(person);
        const { uid } = person;
        setUserId(uid);
      } else {
        console.log("user is not loggedIn")
        setUserId(null);
        setInfo({
          user: null,
          isLoading: false,
        });
      }
    });
  }, []);

  return (
    <UserContext.Provider value={{info, fetchInfo,userId }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
