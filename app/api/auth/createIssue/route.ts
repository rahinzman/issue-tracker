import { connectToDatabase } from "@/app/helpers/server-helpers";
import prisma from "@/prisma";
import { NextResponse } from "next/server";
export const POST = async (req: Request) => {
    try {
        const { title, description, status } = await req.json();
        if(!title || !description || !status) return NextResponse.json({message: "Invalid Data"}, {status: 422})
        const newIssue = await prisma.issue.create({
            data:{
                title,
                description,
                status
            }
        })
        return NextResponse.json({newIssue}, {status:201})
    } catch (error) {
        console.log(error);

        return NextResponse.json({message: "Server Error"}, {status:201})
    } finally {
        await prisma.$disconnect();
    }
}