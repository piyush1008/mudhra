import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { NextResponse } from "next/server";


export const GET=async()=>{
    const prisma=new PrismaClient().$extends(withAccelerate());

    const user=await prisma.user.create({
        data:{
            name:'piyush',
            email:'piyush@hp.com',
            password:'123131'
        }
    })

    console.log(`user created ${JSON.stringify(user)}`);
    const res=await prisma.user.findFirst({
        where:{
            id:1
        }
    })

    console.log("response is ",res)
    return NextResponse.json({
        message:`user info is ${JSON.stringify(res)}`
    })
}