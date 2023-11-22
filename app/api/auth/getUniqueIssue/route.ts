// @ts-nocheck
import prisma from "@/prisma"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req:NextRequest) => {
    try {
        const url = new URL(req.url)
        const getUniqueIssue = await prisma.issue.findUnique({
            where:{
                id: url.searchParams.get('id')
            }
        })
        return NextResponse.json(getUniqueIssue)
    } catch (error) {
        console.log(error)
    } finally {
        prisma.$disconnect
    }
}