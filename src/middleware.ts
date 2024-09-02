'use server'
import { NextRequest, NextResponse } from "next/server";
import { verifyJwtToken } from "./app/utils/utils";


export async function middleware(request: NextRequest){
    let token = request.cookies.get("token")?.value;
    let userid = request.cookies.get("userid")?.value;
    if (!token || !userid) {
        console.log("token or userid not found");
        return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    let result = await verifyJwtToken(token, +userid);
    if (result){
        return NextResponse.next();
    }
}

export const config = {
    matcher: ['/admin/dashboard/:path*', ],
}