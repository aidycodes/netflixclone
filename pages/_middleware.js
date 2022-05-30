import { NextResponse } from 'next/server'
import { verifyAuth } from '../lib/verifyToken4Middleware'

export async function middleware(req, ev) {
    const token = req ? req.cookies?.token : null
    const userId = await verifyAuth(token)
    
    const {pathname, origin} = req.nextUrl.clone()    
        
    if(token && userId || pathname.includes(`/api/login`) || pathname.includes('/images') ){
        return NextResponse.next()
    }
    if(!token && pathname !== '/login' ){
        return NextResponse.redirect(`${origin}/login`, 302)
    }
}