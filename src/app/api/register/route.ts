import { Prisma } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server'
import {prisma }from '@/app/db'
import {hashPassword} from '@/app/utils/utils'
import { RegisterRequestData } from '@/app/admin/(datatype)/datatype'
 

export async function POST(
  req: NextRequest,
  res: NextResponse
) {
  const data = await req.json() as RegisterRequestData;
  const user = await prisma.user.findFirst({
    where: {
      name: data.username
    }
  });
  if (user) {
    return NextResponse.json({
      code: 400,
      success: false,
      message: 'User already registered'
    })
  }
  const newUser = await prisma.user.create({
    data: {
      name: data.username,
      email: data.username + '@example.com',
      password: await hashPassword(data.password)
    }
  });
  if (!newUser) {
    return NextResponse.json({
      code: 500,
      success: false,
      message: 'Error while registering user'
    })
  }
  return NextResponse.json({
    code: 200,  
    success: true,
    message: 'User registered successfully' 
  })
}
