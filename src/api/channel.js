import axios from 'axios';

const key = import.meta.env.VITE_YOUTUBE_API_KEY;

const getChannel = async (cId) => {
	const URL = `https://youtube.googleapis.com/youtube/v3/channels?part=contentDetails%2Csnippet&id=${cId}&key=${key}`;

	const { data } = await axios.get(URL);

	const {
		title: channelTitle,
		description: channelDescription,
		customUrl,
		thumbnails: {medium},
		publishedAt
	} = data?.items[0]?.snippet;

	return {
		channelId: data?.items[0].id,
		customUrl,
		channelTitle,
		channelDescription,
		logo: medium,
		publishedAt
	};
};

export default getChannel;
