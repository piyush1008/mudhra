"use client";
import { AccountInfo } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserInfo } from "../actions/user";
import { ProfileSkeleton } from "@/components/ProfileSkeleton";

export interface userInfo{
    id:string,
    name:string,
    email:string,
    password:string,
    image:string,
    account:AccountInfo
}


export default  function Profile(){
    const {data:session}=useSession();
    const router=useRouter();
    const [profile,setProfile]=useState({
        name:"",
        email:"",
        image:"",
        accountInfo:{
            accnt_number:"",
            account_holder_Name:"",
            account_type:"",
            address:{
                country:"",
                city:"",
                street:"",
                zipcode:""
            }
        }
        });

    const [userprofile,setUserProfile]=useState({
        name:"",
        email:"",
        image:"",
    })
    const [Loading, setLoading]=useState(true)

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
                        const getProfile=await getUserInfo(session.user.email);
                        console.log("getprofile of the user",getProfile)
                        if (getProfile && getProfile.accountInfo) {
                            const { name, email, image, accountInfo } = getProfile;
                            const { accnt_number, account_holder_Name, account_type, address } = accountInfo;

                            // Update the profile state with fetched data
                            setProfile({
                                name,
                                email,
                                image: image || "",
                                accountInfo: {
                                    accnt_number: accnt_number.toString(),
                                    account_holder_Name,
                                    account_type,
                                    address: {
                                        country: address?.country || "",
                                        city: address?.city || "",
                                        street: address?.street || "",
                                        zipcode: address?.zipcode || ""
                                    }
                                }
                            });
                        }
                        if(getProfile)
                        {
                            const { name, email, image} = getProfile;
                            setUserProfile({
                                name,
                                email,
                                image:image || ""
                            })
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

    if(Loading)
    {
        return(
            <div>
               <ProfileSkeleton />
            </div>
        )
    }
    return (
        <div className="flex flex-row min-h-screen justify-center items-center">
            <div className="bg-white overflow-hidden shadow rounded-lg border">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        User Profile
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        This is some information about the {userprofile.name}.
                    </p>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl className="sm:divide-y sm:divide-gray-200">
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Full name
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {userprofile.name}
                            </dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Email address
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {userprofile.email}
                            </dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Account Number
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {profile.accountInfo.accnt_number}
                            </dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Account Holder Name
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {profile.accountInfo.account_holder_Name}
                            </dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Account Type
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {profile.accountInfo.account_type}
                            </dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Address
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {profile.accountInfo.address.street},{profile.accountInfo.address.city},{profile.accountInfo.address.country}<br />
                                {profile.accountInfo.address.zipcode}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    )
}