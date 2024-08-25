import { getUser } from "@/app/actions/user";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { NextResponse } from "next/server";


export const GET=async()=>{
    const res=await getUser();
    console.log(res);
    return NextResponse.json({
        message:`user info is ${JSON.stringify(res)}`
    })
}


