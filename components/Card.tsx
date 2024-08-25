"use client"
import { ChangeEvent, useState } from "react"
import { useRouter } from "next/navigation";
import { GoogleAuthenticator } from "./GoogleAuthenticator";
import { signIn } from "next-auth/react";


export function Card({cardtitle,emailText,passwordText,buttonText}:any){
    const [username,setUsername]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const router=useRouter();
    console.log("SiginCard is rendered");
    return(
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form className="space-y-6" action="#">
                <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h5>
                <div>
                    <LabelIput label="Username" placeholder="Enter your username" onChange={(e)=>{
                        setUsername(e.target.value)
                    }}/>
                </div>
                <div>
                <LabelIput label="Email" placeholder="Enter your email" onChange={(e)=>{
                        setEmail(e.target.value)
                    }}/>                
                </div>
                <div>
                <LabelIput label="Password" placeholder="Enter your email" onChange={(e)=>{
                        setPassword(e.target.value)
                    }}/>                   
                </div>
                <div className="flex items-start">
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                        </div>
                        <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                    </div>
                    <a href="#" className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
                </div>
                <button type="submit" onClick={async(e)=>{
                    e.preventDefault();
                    const res=await signIn("credentials",{
                        name:username,
                        email:email,
                        password:password,
                    })
                    console.log("value after custom credentials login",res);
                    router.push("/");
                }} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
                <GoogleAuthenticator />
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    Not registered? <a href="#" className="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
                </div>


            </form>
        </div>
        

    )
}


function LabelIput({label,placeholder,onChange,type}:inputBox)
{
    return <div>
        <div>
            <label className="block mb-2 text-sm text-bold font-semibold text-gray-900 dark:text-white">{label}</label>
            <input type={type || "text"} id="first_name"  onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
        </div>
    </div>
}

interface inputBox{
    label:string,
    placeholder:string
    onChange:(e:ChangeEvent<HTMLInputElement>) => void
    type?:string
}