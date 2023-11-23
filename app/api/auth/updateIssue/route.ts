// @ts-nocheck
import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";
export const POST = async ( req: NextRequest) => {
    try {
        const { title, description, status } = await req.json();
        const url = new URL(req.url)
        if(!title || !description || !status) return NextResponse.json({message: "Invalid Data"}, {status: 422})
        const newIssue = await prisma.issue.update({
            where:{
                id: url.searchParams.get('id')
            },
            data:{
                title,
                description,
                status
            }
        })
        return NextResponse.json({newIssue}, {status:201})
    } catch(error) {
        console.log(error)

    } finally {
        prisma.$disconnect();
    }
}