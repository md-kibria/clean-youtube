import axios from 'axios';

const key = import.meta.env.VITE_YOUTUBE_API_KEY;

const getPlaylistItem = async (playlistId, pageToken = '', result = []) => {
	const URL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${key}&part=id,contentDetails,snippet&maxResults=50&playlistId=${playlistId}&pageToken=${pageToken}`;

	const { data } = await axios.get(URL);
	result = [...result, ...data.items];

	if (data.nextPageToken) {
		result = getPlaylistItem(playlistId, data.nextPageToken, result);
	}

	return result;
};

const getPlaylist = async (playlistId) => {
	const URL = `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&id=${playlistId}&key=${key}`;

	const { data } = await axios.get(URL);
	let playlistItems = await getPlaylistItem(playlistId);

	const {
		title: playlistTitle,
		description: playlistDescription,
		thumbnails,
		channelId,
		channelTitle,
		publishedAt
	} = data?.items[0]?.snippet;

	playlistItems = playlistItems.map((item) => {
		const {
			title,
			description,
			thumbnails: { standard },
		} = item.snippet;

		return {
			title,
			description,
			thumbnail: standard,
			contentDetails: item.contentDetails,
		};
	});

	// Fetch channel logo
	const CURL = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${key}`
	const { data: cData } = await axios.get(CURL);
	const {default: logo} = cData?.items[0]?.snippet?.thumbnails

	return {
		playlistId,
		playlistTitle,
		playlistDescription,
		playlistThumbnail: thumbnails.standard,
		channelId,
		channelTitle,
		logo,
		playlistItems,
		publishedAt
	};
};

export default getPlaylist;


// https://youtube.googleapis.com/youtube/v3/channels?id=UCrmHQdRbYKFsB602Duho4Tw&key=AIzaSyC58krCmnZqV8TYX4Eyog_b2lryHyxOIdY