"use client"
import { Card } from '@/components/Card';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// function getUser(){
//     const session= useSession();
//     console.log("session inside the sigin are",  session.data);
//     return session; 
// }

export default  function Signin() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/");
        }
    }, [status, router]);

    return (<div className='flex flex-row min-h-screen justify-center items-center'>
       <Card  cardtitle={"Sign in to out platform"} emailText={"Your email"} passwordText={"your password"} buttonText={"Login to your account"}/>
    </div>)
}