import { Box, Grid, Skeleton } from "@mui/material";

const PlaylistItem = () => {
    return (
        <Skeleton variant="rectangular" sx={{height: '100px', background: '#eee', padding: '10px', my: '5px', display: 'flex', textDecoration: 'none'}} />
    )
}

const PlaylistLoader = () => {

    const items = Array(7)

    for(let i = 0; i < items.length; i++) {
        items[i] = i*Math.random()+2+Math.random()
    }

    return (
        <Grid container spacing={2} my="2rem">
            <Grid item lg={6} md={5} xs={12}>
                {/* Thumbnail */}
                <Skeleton variant="rectangular" width={"100%"} height={380} />
                {/* Playlist TItle */}
                <Skeleton
                    variant="text"
                    sx={{ fontSize: "2rem", width: "90%", mt: "1rem" }}
                />

                {/* Channel and action buttons */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        my: "1rem",
                    }}
                >
                    {/* Channel logo and title */}
                    <Box sx={{ display: "flex" }}>
                        <Skeleton variant="circular" width={50} height={50} />
                        <Skeleton
                            variant="text"
                            sx={{
                                fontSize: "1.5rem",
                                width: "150px",
                                ml: "0.5rem",
                            }}
                        />
                    </Box>

                    {/* Favourite and Delete button */}
                    <Box sx={{ display: "flex" }}>
                        <Skeleton
                            variant="circular"
                            width={40}
                            height={40}
                            sx={{ mx: "3px" }}
                        />
                        <Skeleton
                            variant="circular"
                            width={40}
                            height={40}
                            sx={{ mx: "3px" }}
                        />
                    </Box>
                </Box>
                {/* Date */}
                <Skeleton
                    variant="text"
                    sx={{ fontSize: "1rem", width: "90px", my: "3px" }}
                />

                {/* Description */}
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                <Skeleton
                    variant="text"
                    sx={{ fontSize: "1rem", width: "70%" }}
                />
            </Grid>
            <Grid item lg={6} md={7} xs={12}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    {items.map((item) => (
                        <PlaylistItem
                            key={item}
                        />
                    ))}
                </Box>
            </Grid>
        </Grid>
    );
};

export default PlaylistLoader;
