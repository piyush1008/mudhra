"use client";
import { signIn, signOut } from "next-auth/react"
import { useSession } from "next-auth/react";


export const Appbar = () => {
  const session=useSession();
  console.log("session inside appbar", session);
    return <div>

    {session?.data?.user? <LoginDetails />: <LogoutDetails />}   
  
  </div>
}


const LoginDetails=()=>{
  return(
    <div>
        <button onClick={() => signOut()}>Sign out</button>
    </div>
  )
}

const LogoutDetails=()=>{
  return(
    <div>
        <button onClick={() => signIn()}>Sign in</button>
    </div>
  )
}