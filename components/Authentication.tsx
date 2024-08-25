"use client";
import { signIn, signOut } from "next-auth/react"
import { useSession } from "next-auth/react";
import { Button } from "./Button";
import Link from 'next/link';


const LoginDetails=()=>{
    console.log("inside the login detail")
  return(
    <div>
        <li>
            <button onClick={() => signOut()}>Sign out</button>
        </li>
    </div>
  )
}

const LogoutDetails=()=>{
    console.log("logout is renedered")
  return(
    <div>
        <li>
        <button onClick={() => signIn()}>Sign in</button>
        </li>
    </div>
  )
}



export function Authentication()
{
    const session=useSession();
    console.log("session inside Navbar", session);
      return <div>

        
  
      {session?.data?.user? <LoginDetails />: <LogoutDetails />}   
    
    </div>
}