import { Alert, Grid } from "@mui/material";
import Title from "../title";

const PageSection = ({title, TitleIcon, items, Card}) => {

    return (
        <>
            <Title title={title} Icon={TitleIcon}/>
    
            <Grid container spacing={2} mb="2rem">
                {items.length > 0 ? items.map(item => (
                    <Grid item md={4} sm={6} xs={12} key={item?.videoId || item?.playlistId || item?.channelId}>
                        <Card item={item} />
                    </Grid>
                )) : <Alert severity="info" sx={{width: '100%', m:"1rem"}}>There are no {title.toLowerCase()} available for now!</Alert>}
            </Grid>
        </>
    );
};

export default PageSection;
