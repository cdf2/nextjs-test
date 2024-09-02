'use server'
import sha256 from 'crypto-js/sha256';
import { JWTPayload, jwtVerify, JWTVerifyResult, SignJWT } from 'jose';
import { MyJwtPayload } from '../admin/(datatype)/datatype';



const mySecret = 'thisismysecretkey';
const jwtSecret = new TextEncoder().encode('thisismysecretkey');

export async function hashPassword(password: string) {
  return sha256(password+mySecret).toString();
}

export async function  createJwtToken(payload: MyJwtPayload) {
    const token =  await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('2h')
    .sign(jwtSecret);
    return token;
}

export async function verifyJwtToken(token: string, userid: number) {
    console.log(token);
    try {
        const {payload} : JWTVerifyResult<MyJwtPayload> = await jwtVerify(token, jwtSecret);
        console.log(payload, userid);
        if (Date.now() > (payload.exp ?? 0) * 1000){
            console.log('token expired');
            return false;
        }
        if (payload.userId !== userid){
            console.log('invalid userid');
            return false;
        }
        return true;
    } catch (error) {
        console.log('verifyJwtToken error', error);
    }
    return false;
}
