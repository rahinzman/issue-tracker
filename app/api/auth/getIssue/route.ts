import { connectToDatabase } from "@/app/helpers/server-helpers";
import prisma from "@/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const getIssue = await prisma.issue.findMany({})
        return NextResponse.json(getIssue)
    } catch (error) {
        console.log(error)
    }finally {
        await prisma.$disconnect();
    }
}