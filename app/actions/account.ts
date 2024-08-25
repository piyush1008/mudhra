"use server"

import prisma from "@/db";
import { getServerSession } from "next-auth";

export async function CreateAccount(email:string,account_number:string,account_holder_name:string,country:string,city:string,zipcode:string,street:string) {
    // should add zod validation here
    console.log(`email is ${email} , account_number is ${account_number} and account_holder_name is ${account_holder_name} and county is ${country} city is ${city} and zipcode ${zipcode} and street is ${street}`)
    try {
        const acc_no=Number(account_number);
        const accountAndAddress=await prisma.accountInfo.create({
            data:{
                email:email,
                accnt_number: acc_no,
                account_holder_Name:account_holder_name,
                address:{
                    create:{
                        // email:email,
                        country:country,
                        city:city,
                        zipcode:zipcode,
                        street:street

                    }
                }
            }
        })
        console.log("AccountandAdrress",accountAndAddress);
        return accountAndAddress;
    } catch (error) {
        console.log(`error -> ${error}`)
    }
}



export async function UpdateAccount(email: string, account_number: string, account_holder_name: string, country: string, city: string, zipcode: string, street: string) {
    try {
        const acc_no = Number(account_number);

        // Check if the address already exists
        const existingAccount = await prisma.accountInfo.findUnique({
            where: { email: email },
            include: { address: true },
        });

        if (!existingAccount) {
            throw new Error(`No account found for email: ${email}`);
        }

        // If the address exists, update it
        if (existingAccount.address) {
            await prisma.address.update({
                where: {
                    email: email,
                },
                data: {
                    country: country,
                    city: city,
                    zipcode: zipcode,
                    street: street,
                },
            });
        } else {
            // If the address does not exist, create a new one
            await prisma.address.create({
                data: {
                    email: email,
                    country: country,
                    city: city,
                    zipcode: zipcode,
                    street: street,
                },
            });
        }

        // Update the account information
        const updatedAccount = await prisma.accountInfo.update({
            where: { email: email },
            data: {
                accnt_number: acc_no,
                account_holder_Name: account_holder_name,
            },
        });

        console.log("UpdatedAccountAndAddress", updatedAccount);
        return updatedAccount;

    } catch (error) {
        console.log(`error -> ${error}`);
        throw error;
    }
}
