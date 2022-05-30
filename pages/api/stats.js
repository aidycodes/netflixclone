import { findVideoIdByUser, insertStats, updateStats } from '../../lib/db/hasura'
import { verifyToken } from '../../lib/utils'

const stats = async(req,res) => {
    try{
        const token = req.cookies?.token
        if(!token){
             res.status(403).send({})
    }else{
        const inputId = req.method === "POST" ? req.body : req.query
        const { videoId } = inputId       
        if(videoId){        
        const userId = await verifyToken(token)
        const findVideo = await findVideoIdByUser(userId, videoId, token)
            const doesStatsExist = findVideo.length > 0
            if(req.method === "POST"){
                const { favourited, watched = true} = req.body
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
            }else{
                if(doesStatsExist){
                //return data
                res.send({findVideo})  
            } else{
                //return dummy data
                res.send({msg:"no video found","favourited": null})
            }
           }
        } 
    } 

    }catch(err){
        console.log(err, '/stats')
        res.status(500).send({done:false, error:err?.message })
    }
}

 export default stats