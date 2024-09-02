import { LoginRequestData, LoginResponseData, MyJwtPayload } from '@/app/admin/(datatype)/datatype';
import { prisma } from '@/app/db'
import { createJwtToken, hashPassword } from '@/app/utils/utils'
import { Jwt } from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next'
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server'
 

export async function POST(
  req: NextRequest,
  res: NextResponse<LoginResponseData>
) {
  const data = await req.json() as LoginRequestData;
  console.log(data)
  const user = await prisma.user.findFirst({ 
    where: {
      name: data.username,
      password: await hashPassword(data.password) 
    }
  });
  if (!user) {
    console.log('User does not exist or password is incorrect.')
    return NextResponse.json({
      code: 400,
      success: false,
      message: 'User does not exist or password is incorrect.'
    })
  }
  let payload = {
    username: user.name,
    userId: user.id,
  } as MyJwtPayload;
  const token = await createJwtToken(payload);
  cookies().set('token', token)
  cookies().set('username', data.username)
  cookies().set('userid', `${user.id}`)
  return NextResponse.json({
    code: 200, 
    success: true, 
    token: token, 
    message: 'login success'} as LoginResponseData
  )
}