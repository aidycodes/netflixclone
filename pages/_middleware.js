import { NextResponse } from 'next/server'
import { verifyToken } from '../lib/utils'

export async function middleware(req, ev) {
    const token = req ? req.cookies?.token : null
    const userId = await verifyToken(token)
    const url = 'http://localhost:3000' //req.nextUrl.clone()
        
    if(token && userId || url.includes("/login") || url.includes('static') ){
        return NextResponse.next()
    }
    if(!token && url !== '/login' ){
        return NextResponse.next()   //.redirect(url)
    }
}