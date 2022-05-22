import videoData from '../data/videos.json'


const fetchVideos = async(url) => {
        const BASE_URL = 'https://youtube.googleapis.com/youtube/v3'
    
    const res = await fetch(
         `${BASE_URL}/${url}&key=${process.env.YOUTUBE_API_KEY}`
)
        return await res.json()
}

export const getCommonVideos = async(url) => {

try{
    const isDev = process.env.DEVELOPMENT
    const data = isDev ? videoData : await fetchVideos(url)
        if(data?.error){
            console.error('Youtube API Error',data.error)
            return []
        }
    return data?.items.map((item) => (
        {
        title:item.snippet.title,
        imgUrl:item.snippet.thumbnails.high.url,
        id:item?.id?.videoId || item?.id,
        description:item.snippet.description,
        publishTime:item.snippet.publishedAt,
        channelTitle:item.snippet.channelTitle,
        statistics:item.statistics ? item.statistics : {viewCount:0}
    }
    ))
} catch(err){
    console.log(err)
    return []
}
}

export const getVideos = (searchQuery) => {
    const URL = `search?part=snippet&maxResults=15&q=${searchQuery}%20%20`
    return getCommonVideos(URL)
}

export const getPopularVideos = () => {
    const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=25&regionCode=GB`
    return getCommonVideos(URL)
}

export const getYoutubeVideoById = (videoid) => {
    const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoid}`
    return getCommonVideos(URL)
}