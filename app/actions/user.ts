"use server"

import prisma from "@/db";
import { getServerSession } from "next-auth";

export async function getUser() {
    // should add zod validation here
    const user = await prisma.user.findMany({});

    console.log(user);

    
    return user;
}

export async function getUserInfo(email: string) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
            include: {
                accountInfo: {
                    include: {
                        address: true,
                    },
                },
            },
        });

        if (!user) {
            throw new Error(`User with email ${email} not found.`);
        }
        console.log("all the info about the user", user);
        return user;
    } catch (error) {
        console.error("Error fetching user info:", error);
        throw error; // Handle or rethrow the error based on your application needs
    }
}



