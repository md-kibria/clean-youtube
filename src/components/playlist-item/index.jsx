import { Box, Typography } from "@mui/material"
import { Link } from "react-router-dom"

const PlaylistItem = ({video, indx, playlistId, sidebar, sm}) => {
    const {title, thumbnail, contentDetails:{videoPublishedAt, videoId}} = video

    return (
        <Box sx={{height: '100px', background: '#eee', padding: '10px', my: '5px', display: 'flex', textDecoration: 'none'}} to={`/playlist/${playlistId}/video/${videoId}`} component={Link} >
            <Typography sx={{my: 'auto', mr: '5px', color: '#777'}}>{String(indx).length == 1 ? '0'+indx : indx}</Typography>
            <img 
            height={'100%'} 
            width={sm && '80px'}
            src={thumbnail.url}
            alt="" />

            <Box ml="1rem" sx={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                <Typography color={'#635985'}>{sidebar ? title.substring(0, 36) + '...' : title.length > 72 ? title.substring(0, 72)+'...' : title}</Typography>
                {/* <Typography color={'#635985'} fontSize={12}>{new Date(videoPublishedAt).toDateString().substring(3)}</Typography> */}
                <Typography color={'#635985'} fontSize={15}>Stack Learner</Typography>
            </Box>
        </Box>
    )
}

export default PlaylistItem