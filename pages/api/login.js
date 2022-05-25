import { magicAdmin } from "../../lib/db/magic"
import jwt from 'jsonwebtoken'
import { isNewUser, createNewUser } from "../../lib/db/hasura"
import { setTokenCookie } from "../../lib/cookies"

const login = async(req, res) => {
    if(req.method === 'POST'){
    try{     
        const auth = req.headers.authorization
      
        const didToken = auth ? auth.substr(7) : ''
        const metadata = await magicAdmin.users.getMetadataByToken(didToken)
    //jwt
            const token = jwt.sign({
                                ...metadata,
                                "iat": Math.floor(Date.now() / 1000) - 10, 
                                "exp": Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60), 
                                "https://hasura.io/jwt/claims": {
                                    "x-hasura-allowed-roles": ["admin","user"],
                                    "x-hasura-default-role": "user",
                                    "x-hasura-user-id": `${metadata.issuer}`
                                }
                                },process.env.JWT_SECRET
                                )         
                                  
            const isNewUserQuery = await isNewUser(token, metadata.issuer)
            isNewUserQuery && await createNewUser(token, metadata)
            setTokenCookie(token, res)             
                res.send({done:true})        
    }catch(err){
        console.log(err)
        res.status(500).send({done:false})   
      }
    } else {
        res.send({done:false})
    }
}

export default login