"use client";

import { Button } from "@/components/Button";
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CreateAccount, UpdateAccount } from "../actions/account";
import { AccountSkeleton } from "@/components/AccountSkeleton";
import { toast } from "react-hot-toast";


export default function Account(){
    const {data:session}=useSession();
    const router=useRouter();
    const [account,setAccount]=useState({
        email:"",
        account_number:"",
        account_holder_name:"",
    })
    const [loading,setLoading]=useState(true)
    const [visited,setVisited]=useState(true);
    const [address,setAddress]=useState({
        email: "",
        country:"",
        city: "",
        street: "",
        zipcode:""
    })
    console.log("session in the account page",session);


    const updateChanges=async()=>{
        const reponse=await UpdateAccount(account.email,account.account_number,account.account_holder_name,address.country,address.city,address.zipcode,address.street);
        console.log("account is updated")
        toast.success("account is updated succesfully");
        router.push("/")
    }

     const handleChange=async()=>{
        try {
            const response=await CreateAccount(account.email,account.account_number,account.account_holder_name,address.country,address.city,address.zipcode,address.street);
            console.log("respone after account creation",response);
            toast.success("Account is created successfully");
            router.push("/")
        } catch (error) {
           console.log("error after submitting ", error); 
        }
     }
    useEffect(()=>{
        if(!session)
        {
            router.push("/signin")
        }
        else{
            const fetchProfile = async () => {
                if(session.user?.email)
                {
                    try {
                        const email=session.user.email || ""
                        setAccount((prevAccount) => ({
                            ...prevAccount,
                            email: email,
                        }));
                        setAddress((prevAddress) => ({
                            ...prevAddress,
                            email: email,
                        }));
                        console.log("email before calling the db call ", session.user.email);
                        const response = await fetch(`/api/user/account?email=${session.user.email}`);
                        if (response.ok) {
                            const data = await response.json();
                            console.log("response is recoreded",data.message)
                            const {accnt_number,account_holder_Name,address}=data.message;
                            const {city,country,street,zipcode}=address;
                            setAccount({
                                email:session.user.email,
                                account_number:accnt_number,
                                account_holder_name:account_holder_Name
                            })

                            setAddress({
                                email:email,
                                city:city || "",
                                country:country || "",
                                street:street || "",
                                zipcode:zipcode || ""
                            })
                            setVisited(false);

                           
                        } else {
                            console.error('Failed to fetch profile');
                        }
                    } catch (error) {
                        console.error('Error fetching profile:', error);
                    } finally {
                        setLoading(false);
                    }
                }
                };
               
            fetchProfile();
        }
    },[session,router])

    if(loading)
    {
        return <div className="flex justify-center">
        <div className="flex-col ">
          <AccountSkeleton />
          <AccountSkeleton />
          <AccountSkeleton />
          <AccountSkeleton />
        </div>
    </div>
    }
    return(
    <div className="flex flex-row min-h-screen justify-center items-center">
        <form className="max-w-sm mx-auto">
            <label htmlFor="email-address-icon" className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                    <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
                </svg>
                </div>
                <input type="text" id="email-address-icon" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={account.email} disabled />
            </div>


            <label htmlFor="email-address-icon" className="block mb-2  mt-2 text-sm font-medium text-gray-900 dark:text-white">Enter Account Number</label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                
                </div>
                <input type="number" onChange={(e)=>{
                    setAccount({...account,account_number:e.target.value})
                }} id="account_number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" value={account.account_number} required />            
             </div>

          
            <label htmlFor="email-address-icon" className="block mb-2  mt-2 text-sm font-medium text-gray-900 dark:text-white">Enter Account Holder Name</label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                
                </div>
                <input type="text" onChange={(e)=>{
                    setAccount({...account,account_holder_name:e.target.value})
                }}  id="name" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John Doe" value={account.account_holder_name}required />           
             </div>


            <label htmlFor="email-address-icon" className="block mb-2  mt-2 text-sm font-medium text-gray-900 dark:text-white">Account Type</label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                
                </div>
                <input type="text" id="accounttype" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value="Saving" disabled />           
             </div>


             <div className="grid gap-6 mb-6 md:grid-cols-2 mt-2">
                <div>
                    <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
                    <input type="text" onChange={(e)=>{
                    setAddress({...address,country:e.target.value})
                }} id="country" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" value={address.country} required />
                </div>
                <div>
                    <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                    <input type="text" onChange={(e)=>{
                    setAddress({...address,city:e.target.value})
                }} id="city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Delhi"  value={address.city} required />
                </div>
                <div>
                    <label htmlFor="street" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Street Address</label>
                    <input type="text" onChange={(e)=>{
                    setAddress({...address,street:e.target.value})
                }}  id="street" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Shastri Nagar" value={address.street} required />
                </div>  
                <div>
                    <label htmlFor="zip" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Zip Code</label>
                    <input type="text" onChange={(e)=>{
                    setAddress({...address,zipcode:e.target.value})
                }}  id="zip_code" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="12-456" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" value={address.zipcode} required />
                </div>
            </div>

            {visited ? <Button text={"Submit"} onClick={handleChange} /> : <Button text={"Update"} onClick={updateChanges} />}
            
        </form>

       
    </div>

    )
}



