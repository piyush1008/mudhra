"use server"

import prisma from "@/db";

export async function signup(username: string, password: string) {
    // should add zod validation here
    const user = await prisma.user.findFirst({
        where:{
            id:1
        }
    });

    console.log(user);

    return "Signed up!"
}
