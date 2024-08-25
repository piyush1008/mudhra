// /pages/api/profile.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/db';
import { NextRequest, NextResponse } from 'next/server';





export  async function GET(req: NextRequest, res: NextResponse) {


    const { searchParams } = new URL(req.url);
    const email=searchParams.get("email");
    // console.log("request query", req.query);
    // const { email } = req.query;

    console.log("email inside the user account api call ",email);
    
    if (!email || typeof email !== 'string') {
        return NextResponse.json({ error: 'Email is required' },{status:404});
    }
    console.log("user profile is called");
    try {
        const profile=await prisma.accountInfo.findUnique({
            where:{
                email:email
            },
            include:{
                address:true
            }
        })
        if (!profile) {
            // return res.status(404).json({ error: 'Profile not found' });
            return NextResponse.json({ error: 'Profile is not found' },{status:404});

        }
        console.log("profile of the user", profile);
        //return res.status(200).json(profile);
        return NextResponse.json({message:profile},{status:200});

    } catch (error) {
        console.error('Error catch fetching profile:', error);
        //return res.status(500).json({ error: 'Failed to fetch profile' });
        return NextResponse.json({ error: 'Failed to fetch profile' },{status:500});

    }
}




// export {handler as GET, handler as POST}



// export {handler as GET, handler as POST}