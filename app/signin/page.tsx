"use client"
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function() {
    const router = useRouter();

    return <div>
        <button onClick={async () => {
            await signIn("google");
        }}>Login with google</button>

        <br />
        <input type="text" placeholder='username' />
        <input type="email" placeholder='abc@hp.com' />
        <input type="password" placeholder='123' />


        <button onClick={async () => {
            const res = await signIn("credentials", {
                name: "",
                email: "",
                password:"",
                redirect: false,
            });
            console.log(res);
            router.push("/")
        }}>Login with email</button>
        
    </div>
}