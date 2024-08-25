import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import {Toaster} from "react-hot-toast";
// import prisma from "@/db";

export const authOptions={
    providers:[
        CredentialsProvider({
            name: "Credentials",
            credentials:{
                email:{label:"Email",type:"email", placeholder:"abc@something.com"},
                password:{label:"Password",type:"password",placeholder:"131231"},
                name:{label:"username", type:"text", placeholder:"abcabc"}
            },
            async authorize(credentials:any)
            {
                console.log("authorize is called")
                const prisma=new PrismaClient();
                const hashpassword=await bcrypt.hash(credentials.password,10);
                const existingUser=await prisma.user.findFirst({
                    where:{
                        email:credentials.email
                    }
                })
                console.log("hashpassword", hashpassword);
                console.log("existing user", existingUser)
                if(existingUser)
                {
                    console.log(`credentials password is ${credentials.password} and  ${existingUser.password}`)
                    // const passwordValidation=await bcrypt.compare(credentials.password,existingUser.password)
                    const passwordValidation= credentials.password === existingUser.password;
                    console.log("passwordValidation", passwordValidation);
                    if(passwordValidation)
                    {
                        return{
                            id:existingUser.id.toString(),
                            email:existingUser.email,
                            name:existingUser.name
                        }
                    }
                    return null;
                }
                try {
                    const user=await prisma.user.create({
                        data:{
                            email:credentials.email,
                            password:credentials.password,
                            name:credentials.name
                        }
                    })
                    console.log("user is created", user);
                    return{
                        id:user.id.toString(),
                        name:user.name,
                        email:user.email
                    }
                } catch (error) {
                    console.log(`Error while authenticatioin ${error}`)
                }
                return null;
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        })
    ],
    secret: process.env.NEXTAUTH_SECRET || "secret",
    callbacks:{
        async signIn({user,account,profile}:any)
        {
            console.log("google signin");
            if(account.provider==="google")
            {
                console.log("googe authentication sigin")
                const prisma=new PrismaClient();
                const existingUser=await prisma.user.findUnique({
                    where:{
                        email:user.email
                    }
                })
                console.log("exisitingUser is ", existingUser);
                if(!existingUser)
                {
                    await prisma.user.create({
                        data:{
                            name:user.name,
                            email:user.email,
                            password:"piyush",
                            image:user.image || null
                        }
                    })
                }
            }
            return true;
        },
        async session({token, session}:any)
        {
            session.user.id=token.sub
            return session
        },
        async redirect({ url, baseUrl }:any) {
            // Redirect to home page after sign-in
            if(url==='/signin')
            {
                return baseUrl;
            }
            return baseUrl;
        },
    },
    pages: {
        signIn: '/signin',
    }
}