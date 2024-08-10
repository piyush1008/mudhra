import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

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
                const prisma=new PrismaClient();
                const hashpassword=await bcrypt.hash(credentials.password,10);
                const existingUser=await prisma.user.findFirst({
                    where:{
                        email:credentials.email
                    }
                })
                if(existingUser)
                {
                    const passwordValidation=await bcrypt.compare(credentials.password,existingUser.password)
                    if(passwordValidation)
                    {
                        return{
                            id:existingUser.id.toString(),
                            email:existingUser.email
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
        async session({token, session}:any)
        {
            session.user.id=token.sub
            return session
        }
    } ,
    pages: {
        signIn: '/signin',
    }
}