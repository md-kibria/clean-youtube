import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, Container } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HistoryIcon from "@mui/icons-material/History";
import { Link } from "react-router-dom";
import Modal from "../modal";

const Navbar = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="static"
                sx={{ background: "#443C68", textDecoration: "none" }}
                to="/"
                component={Link}
            >
                <Container maxWidth={"lg"}>
                    <Toolbar>
                        
                        <Box sx={{height: '100%', flexGrow: 1,}}>
                             <img src="/logo.png" alt="" height={50} style={{margin: "auto 0", display: 'block'}} />
                        </Box>
                        {true ? (
                            <>
                                <IconButton
                                    color="primary"
                                    sx={{ color: "#fff" }}
                                    to="/"
                                    component={Link}
                                >
                                    <HomeIcon />
                                </IconButton>
                                <IconButton
                                    color="primary"
                                    sx={{ color: "#fff" }}
                                    to="/favourites"
                                    component={Link}
                                >
                                    <FavoriteIcon />
                                </IconButton>
                                <IconButton
                                    color="primary"
                                    sx={{ color: "#fff" }}
                                    to="/recents"
                                    component={Link}
                                >
                                    <HistoryIcon />
                                </IconButton>
                                <Button
                                    variant="contained"
                                    sx={{ mx: 1, background: "#635985" }}
                                    color="secondary"
                                    onClick={handleClickOpen}
                                >
                                    Add
                                </Button>
                            </>
                        ) : (
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                sx={{ mr: 2 }}
                            >
                                <MenuIcon />
                            </IconButton>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>
            <Modal open={open} handleClose={handleClose} />
        </Box>
    );
};

export default Navbar;
