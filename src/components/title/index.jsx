import { Box, Typography } from "@mui/material"


const Title = ({title, Icon}) => {
    return (
        <Box sx={{ display: "flex", my: "1rem", color: "#635985", mt: "2rem" }}>
                <Typography
                    component="p"
                    variant="h4"
                    sx={{ display: "flex", alignItems: "center" }}
                >
                    {Icon && <Icon fontSize="25px" />}
                </Typography>
                <Typography
                    component="h1"
                    variant="h5"
                    sx={{ display: "flex", alignItems: "center", marginLeft: 1 }}
                >
                    {title && title}
                </Typography>
            </Box>
    )
}

export default Title