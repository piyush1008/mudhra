import Image from "next/image";
import { Appbar } from "./Appbar";
import { getServerSession } from "next-auth";
import { Navbar } from "@/components/Navbar";
import { Authentication } from "@/components/Authentication";

async function getUser(){
  const session=await getServerSession();
  return session;
}

export default async function Home() {
  const sesion=await getUser();
  console.log('sesion returned ', sesion);
    return <div>
      <Navbar />
       <div className="pt-16 flex flex-col min-h-screen justify-center items-center">
      
          <div className="text-center">
            <h3 className="text-6xl">Unlock seamless payments and effortless transactions</h3>
            <h3 className="text-xl mt-4">Join us today for a smarter way to manage your money!</h3>  
          </div>
       
          <div className="text-center mt-16">
            <h3 className="text-3xl">Best practice ,Ignore on your own accord </h3> 
              
          </div>

          <div className="text-1sm text-center mt-8 px-52">
                For safe transactions on our website, always ensure that you use strong, unique passwords and avoid sharing them with others. 
              Keep your payment information secure by only entering it on our secure, encrypted checkout page. 
              Regularly monitor your account for any unauthorized activity and report any suspicious transactions immediately.
              Lastly, always log out of your account after completing transactions, especially when using a shared or public device.  
            </div> 

            
          

      </div>
       
       
    </div>
}

// function BestPratice(){
//   return(
//     <div className="flex flex-col justify-center items-center mt-0">
//         <div className="text-center">
//           <h3 className="text-5xl">"Best practices" don't follow on your own accord </h3>
//         </div>
//     </div>
//   )
// }
