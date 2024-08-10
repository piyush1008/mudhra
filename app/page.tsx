import Image from "next/image";
import { Appbar } from "./Appbar";
import { getServerSession } from "next-auth";

async function getUser(){
  const session=await getServerSession();
  return session;
}

export default async function Home() {
  const sesion=await getUser();
  console.log('sesion returned ', sesion);
    return <div>
      Hii from the home page
      <Appbar />
    </div>
}
