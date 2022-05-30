export async function getFavVideos(userId, token) {
  const operationsDoc = `
  query favVideos($userId: String!) {
    stats(where: {userId: {_eq: $userId}, favourited: {_eq: 1}}) {
      videoId
    }
  }
`;

    const response = await queryHasuraGraphQL(operationsDoc,
        "favVideos", 
            { userId },  token
  )
   
  return response?.data?.stats
}


export async function getWatchedVideos(userId, token){
  const operationsDoc = `
  query getWatchedVideos($userId : String!) {
    stats(where: {userId: {_eq: $userId}, watched: {_eq: true}}) {
      videoId
    }
  }
`;
    const response = await queryHasuraGraphQL(operationsDoc,
        "getWatchedVideos", 
            { userId },  token
  )
     
  return response?.data?.stats

}


export async function insertWatched(token, { favourited, userId, watched, videoId } ) { 

   const operationsDoc = `
 mutation insertStats($favourited: Int!, $userId: String!, $watched: Boolean!, $videoId: String! ) {   
    insert_stats_one(object: {
      favourited: $favourited, 
      userId: $userId, 
      videoId: $videoId, 
      watched: $watched
    }) {
     
      favourited
      userId
      videoId
      watched
      
     }
    }
`;

    const response = await queryHasuraGraphQL(operationsDoc,
        "insertStats", 
            {favourited, userId, watched, videoId},  token
  )

  return response
}  


export async function insertStats(token, { favourited, userId, watched, videoId } ) { 

   const operationsDoc = `
 mutation insertStats($favourited: Int!, $userId: String!, $watched: Boolean!, $videoId: String! ) {   
    insert_stats_one(object: {
      favourited: $favourited, 
      userId: $userId, 
      videoId: $videoId, 
      watched: $watched
    }) {
     
      favourited
      userId
      videoId
      watched
      
     }
    }
`;

    const response = await queryHasuraGraphQL(operationsDoc,
        "insertStats", 
            {favourited, userId, watched, videoId},  token
  )

  return response
}  


export async function updateStats(token, { favourited, userId, watched, videoId } ) { 
   
  const operationsDoc = `
    mutation updateStats($favourited: Int!, $userId: String!, $watched: Boolean!, $videoId: String! ) {
      update_stats(
        _set: {watched: $watched, favourited:$favourited}, 
        where: {
            userId: {_eq: $userId},
            videoId: {_eq: $videoId}}) {
        returning {
          favourited
          id
          userId
          videoId
          watched
        }}
      }`

    const response = await queryHasuraGraphQL(operationsDoc,
        "updateStats", 
            {favourited, userId, watched, videoId},  token
  )

  return response
}  


export async function findVideoIdByUser(userId, videoId, token) {
  const operationsDoc = `
  query findVideoIdByUserId($videoId:String!, $userId:String!) {
    stats(where: {videoId: {_eq: $videoId}, userId: {_eq: $userId}}) {
      id
      watched
      videoId
      userId
      favourited
    }
  }
`;
       const response = await queryHasuraGraphQL(operationsDoc,
        "findVideoIdByUserId", 
            {userId, videoId},  token
  )  
  return response?.data?.stats
}


export async function createNewUser(token, metadata) {   
        const operationsDoc = `
            mutation createNewUser($issuer: String!, $email: String!, $publicAddress: String!) {
                        insert_users(objects: {email:$email,  
                        issuer: $issuer, 
                        publicAddress: $publicAddress
            }) {

                returning {
                    email
                    id
                    issuer
                    
                }
            }
        }
            `;
            const { issuer, email, publicAddress } = metadata
    const response = await queryHasuraGraphQL(operationsDoc,
        "createNewUser", 
            {issuer, email, publicAddress},  token
  )
   
  return response
}  


export async function isNewUser(token, issuer) {
    const operationsDoc = `
     query MyQuery($issuer:String!) {
    users(where: {issuer: {_eq: $issuer}}) {
      id
      email
      issuer
    }
  }
`;  
    const response = await queryHasuraGraphQL(operationsDoc,
    "MyQuery", 
    {issuer},  token
  )
  
  return response?.data?.users?.length === 0 
    
}


export async function queryHasuraGraphQL(operationsDoc, operationName, variables, token) {
  const result = await fetch(
    process.env.NEXT_PUBLIC_HASURA_ADMIN_URL,
    {
      method: "POST",
      headers:{
       // "x-hasura-admin-secret":process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET,
       Authorization:`Bearer ${token}`,
       "Content-type":"application/json"
      },
      body: JSON.stringify({
        query: operationsDoc,
        variables: variables,
        operationName: operationName
      })
    }
  );

  return await result.json();
  
}
