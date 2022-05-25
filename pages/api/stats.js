import jwt from 'jsonwebtoken'
import { findVideoIdByUser, insertStats } from '../../lib/db/hasura'
import { updateStats } from '../../lib/db/hasura'

const stats = async(req,res) => {
if(req.method === "POST"){
    try{
        const token = req.cookies?.token
        if(!token){
             res.status(403).send({})
    }else{
        const { videoId, favourited, watched = true} = req.body
        if(videoId){
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decodedToken.issuer
        const findVideo = await findVideoIdByUser(userId, videoId, token)
            const doesStatsExist = findVideo.length > 0
            if(doesStatsExist){
                //update
                const response = await updateStats(token, {
                    favourited,
                    watched,
                    userId,                    
                    videoId})
                 res.status(200).send({data:response})
            } else{
                //create
                 const response = await insertStats(token, {
                    favourited,
                    watched,
                    userId,                    
                    videoId})
                 res.status(200).send({data:response})
            }
         } else {
             res.status(500).send({msg:"no videoId was sent"})
         }
        }
    } catch(err){
        console.log(err, '/stats')
        res.status(500).send({done:false, error:err?.message })
    }
} else { 
    try{
        const token = req.cookies?.token
        if(!token){
             res.status(403).send({})
    }else{
        const { videoId } = req.body
        if(videoId){
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decodedToken.issuer
        const findVideo = await findVideoIdByUser(userId, videoId, token)
           const doesStatsExist = findVideo?.length > 0
            if(doesStatsExist){
                //return data
                res.send({findVideo})  
            } else{
                //return dummy data
                res.send({msg:"no video found","favourited": null})
            }
         } else {
             res.status(500).send({msg:"no videoId was sent"})
         }
        }
    } catch(err){
        console.log(err, '/stats')
        res.status(500).send({done:false, error:err?.message })
    }

}
}
 export default stats