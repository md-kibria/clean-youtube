import axios from 'axios';

const key = import.meta.env.VITE_YOUTUBE_API_KEY;


const getVideo = async (videoId) => {
	const URL = ` https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails%2Csnippet&id=${videoId}&key=${key}`

	const { data } = await axios.get(URL);

	const {
		title: videoTitle,
		description: videoDescription,
		thumbnails: {standard},
		channelId,
		channelTitle,
		publishedAt
	} = data?.items[0]?.snippet;


	// Fetch channel logo
	const CURL = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${key}`
	const { data: cData } = await axios.get(CURL);
	const {default: logo} = cData?.items[0]?.snippet?.thumbnails

	return {
		videoId,
		videoTitle,
		videoDescription,
		videoThumbnail: standard,
		channelId,
		channelTitle,
		logo,
		publishedAt
	};
};

export default getVideo;
