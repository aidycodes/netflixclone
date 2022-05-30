import jwt from 'jsonwebtoken'
import { findVideoIdByUser, insertWatched } from '../../lib/db/hasura'

const setWatched = async(req,res) => {   
        try{
        const token = req.cookies?.token
        if(!token){
             res.status(403).send({})
    }else{      
        const inputId = req.body 
        const { videoId } = inputId      
        if(videoId){              
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decodedToken.issuer
        const findVideo = await findVideoIdByUser(userId, videoId, token)
            const doesStatsExist = findVideo.length > 0
            if(req.method === "POST"){
                const {favourited = null, watched = true} = req.body
                if(doesStatsExist){
                    res.status(200).send({msg:'video exists', findVideo})
            } else{
                //create
                 const response = await insertWatched(token, {
                    favourited,
                    watched,
                    userId,                    
                    videoId})
                 res.status(200).send({data:response})
            }
        }    
}}}catch(err){
    console.log(err)
    res.status(500).send({err:err?.message, msg:'error'})
}}

export default setWatched