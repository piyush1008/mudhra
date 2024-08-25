
import { getServerSession } from "next-auth"



export async function Profile(){
    const session=await getServerSession();
    let image="";
    if(session?.user?.image)
    {
        image=session.user.image;
    }
    else{
        image=""
    }
    console.log("session inside profile is ", session);
    console.log('image is ', session?.user?.image);
    return (
        <button type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
        {session?.user?.image ? <img className="w-8 h-8 rounded-full" src={session.user.image} alt="user photo" /> : null}
        
     </button>  
    )
}