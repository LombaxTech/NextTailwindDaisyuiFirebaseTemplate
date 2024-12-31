import { addDoc, collection } from "firebase/firestore";
import { useContext } from "react";

import { AuthContext } from "@/context/AuthContext";
import { db } from "@/lib/firebase";

export default function App() {
  const { user, userLoading } = useContext(AuthContext);

  const addStuff = async () => {
    const docRef = await addDoc(collection(db, "users"), {
      first: "Ada",
      last: "Lovelace",
      born: 1815,
    });
    console.log("Document written with ID: ", docRef.id);
  };

  return (
    <div className="">
      <button onClick={addStuff} className="btn btn-primary">
        Click me!
      </button>
    </div>
  );
}
