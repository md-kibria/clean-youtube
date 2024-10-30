import axios from 'axios';

const key = import.meta.env.VITE_YOUTUBE_API_KEY;

const perPage = 30;


const getResult = async (q, type, token='') => {
	const URL = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${q}&type=${type}&maxResults=${perPage}&pageToken=${token}&key=${key}`;

	const { data } = await axios.get(URL);

	if(type === 'video') {
		const {nextPageToken=null,prevPageToken=null, regionCode, pageInfo: {totalResults, resultsPerPage}, items} = data;
	
		const videos = items.map(item => {
			return {
				videoId: item.id.videoId,
				videoTitle: item.snippet.title,
				videoThumbnail: item.snippet.thumbnails.medium,
				channelId: item.snippet.channelId,
				channelTitle: item.snippet.channelTitle,
				publishedAt: item.snippet.publishedAt
			}
		})

		return {
			nextPageToken,
			prevPageToken,
			regionCode,
			totalResults,
			resultsPerPage,
			items: videos
		}
	}

	if(type === 'playlist') {
		const {nextPageToken=null,prevPageToken=null, regionCode, pageInfo: {totalResults, resultsPerPage}, items} = data;
	
		const playlists = items.map(item => {
			return {
				playlistId: item.id.playlistId,
				playlistTitle: item.snippet.title,
				playlistThumbnail: item.snippet.thumbnails.medium,
				channelTitle: item.snippet.channelTitle,
				channelId: item.snippet.channelId,
				publishedAt: item.snippet.publishedAt
			}
		})

		return {
			nextPageToken,
			prevPageToken,
			regionCode,
			totalResults,
			resultsPerPage,
			items: playlists
		}
	}

	if(type === 'channel') {
		const {nextPageToken=null,prevPageToken=null, regionCode, pageInfo: {totalResults, resultsPerPage}, items} = data;
	
		const channels = items.map(item => {
			return {
				channelId: item.id.channelId,
				channelTitle: item.snippet.channelTitle,
				customUrl: '',
				logo: item.snippet.thumbnails.medium,
				publishedAt: item.snippet.publishedAt
			}
		})

		return {
			nextPageToken,
			prevPageToken,
			regionCode,
			totalResults,
			resultsPerPage,
			items: channels
		}
	}

};

export default getResult;

