import { Grid, Skeleton } from "@mui/material";

const SearchLoader = () => {
    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return (
        <Grid container spacing={2} mb="2rem">
            {items.map(item => (
                <Grid item md={4} sm={6} xs={12} key={item}>
                    <Skeleton variant="rounded" sx={{ height: 390, width: '100%' }} />
                </Grid>
            ))}
        </Grid>
    );
};

export default SearchLoader;
