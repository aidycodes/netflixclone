import { jwtVerify } from 'jose'

export async function verifyAuth(token) {
  
  if (!token) {
    return {error:'no token'}  }

  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    )
    return verified.payload.issuer 
  } catch (err) {
    return { error: 'Your token has expired.' }
  }
}