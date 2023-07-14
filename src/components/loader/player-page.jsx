import { Box, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import responsiveHeight from "../../utils/responsiveHeight";

const PlayerLoader = () => {
    const [plHeight, setPlHeight] = useState(550);

    useEffect(() => {
        window.addEventListener("resize",() => responsiveHeight(setPlHeight));
        responsiveHeight(setPlHeight)
    }, []);

    return (
        <Box my="1rem">
            <Box sx={{ display: "flex", position: "relative" }}>
                {/* Player */}
                <Skeleton
                    variant="rectangular"
                    sx={{ height: plHeight, width: "100%" }}
                />
            </Box>

            {/* Prev / Next buttons */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: "2rem",
                }}
            >
                <Skeleton variant="rounded" sx={{ height: 40, width: 100 }} />
                <Skeleton variant="rounded" sx={{ height: 40, width: 100 }} />
            </Box>

            {/* Playlist Title */}
            <Skeleton
                variant="text"
                sx={{ fontSize: "2rem", width: "90%", mt: "1rem" }}
            />

            {/* Channel logo and title */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    my: "1rem",
                }}
            >
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
            <Skeleton variant="text" sx={{ fontSize: "1rem", width: "70%" }} />
        </Box>
    );
};

export default PlayerLoader;
