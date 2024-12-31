import { AuthContext } from "@/context/AuthContext";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { FaUserCircle } from "react-icons/fa";

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
    <div className="p-2 flex items-center justify-between shadow-md">
      <h1 className="font-bold italic">
        <Link href={"/"} className="italic">
          Logo
        </Link>
      </h1>
      <ul className="flex gap-4">
        {!user && (
          <>
            <Link href={"/signin"}>
              <button className="btn btn-primary btn-sm">Sign In</button>
            </Link>
          </>
        )}
        {user && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              {user?.profilePictureUrl ? (
                <div className="w-10 rounded-full">
                  <img
                    src={user?.profilePictureUrl}
                    alt="profile picture"
                    className="w-10 h-10 rounded-full"
                  />
                </div>
              ) : (
                <FaUserCircle className="w-8 h-8" />
              )}
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {/* <li>
                <Link href={"/my-profile"} className="justify-between">
                  Profile
                </Link>
              </li> */}

              <li>
                <a onClick={signout}>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </ul>
    </div>
  );
}
