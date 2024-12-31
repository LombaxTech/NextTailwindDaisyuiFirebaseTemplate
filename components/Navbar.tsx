import { AuthContext } from "@/context/AuthContext";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";

const provider = new GoogleAuthProvider();

export default function Navbar() {
  const { user, userLoading } = useContext(AuthContext);
  const router = useRouter();

  const signout = async () => {
    try {
      await signOut(auth);
      console.log("signed out");
      router.push("/");
    } catch (error) {
      console.log("error signing out...");
      console.log(error);
    }
  };

  const signinWithGoogle = async () => {
    try {
      let result = await signInWithPopup(auth, provider);

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 flex items-center justify-between shadow-md">
      <h1 className="font-bold italic">
        <Link href={"/"} className="italic">
          Logo
        </Link>
      </h1>
      <ul className="flex gap-4">
        {!user && (
          <>
            {/* <GoogleButton onClick={signinWithGoogle} /> */}
            <Link href={"/signin"}>
              <button className="btn btn-primary btn-sm">Sign In</button>
            </Link>
          </>
        )}
        {user && (
          <li className="cursor-pointer" onClick={signout}>
            Sign Out
          </li>
        )}
      </ul>
    </div>
  );
}
