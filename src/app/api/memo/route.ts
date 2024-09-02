import { AddMemoRequestData, AddMemoResponseData, CodeType, GetMemoRequestData, GetMemoResponseData, LoginRequestData, LoginResponseData } from '@/app/admin/(datatype)/datatype';
import { prisma } from '@/app/db'
import { createJwtToken, hashPassword } from '@/app/utils/utils'
import type { NextApiRequest, NextApiResponse } from 'next'
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server'


export async function POST(
    req: NextRequest,
    res: NextResponse<AddMemoResponseData>
) {
    const data = await req.json() as AddMemoRequestData;
    console.log(data)
    const uid = req.cookies.get('userid')?.value;
    if (!uid) {
        console.log('no uid in cookies')
        return NextResponse.json({
            code: CodeType.UNAUTHORIZED,
            success: false,
            message: 'no uid in cookies'
        })
    }
    const memo = await prisma.memo.create({
        data: {
            title: data.title,
            content: data.content,
            authorId: +uid,
        }
    });
    if (!memo) {
        console.log('create memo failed')
        return NextResponse.json({
            code: CodeType.INTERNAL_SERVER_ERROR,
            success: false,
            message: 'create memo failed'
        })
    }
    return NextResponse.json({
        code: 200,
        success: true,
        message: 'memo created successfully',
    } as AddMemoResponseData
    )
}

export async function GET(
    req: NextRequest
) {
    const data = req
    const uid = req.cookies.get('userid')?.value;
    if (!uid) {
        console.log('no uid in cookies')
        return NextResponse.json({
            code: CodeType.UNAUTHORIZED,
            success: false,
            message: 'no uid in cookies'
        })
    }
    const memo = await prisma.memo.findMany({
        where:{
            authorId: +uid
        },
    })
    console.log(memo)
    if (!memo) {
        console.log('get memo failed')
        return NextResponse.json({
            code: CodeType.INTERNAL_SERVER_ERROR,
            success: false,
            message: 'get memo failed'
        })
    }
    return NextResponse.json({
        code: 200,
        success: true,
        message: 'get memo successfully',
        data: memo
    } as GetMemoResponseData
    )

}