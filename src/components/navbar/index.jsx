import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, Container, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HistoryIcon from "@mui/icons-material/History";
import { Link } from "react-router-dom";
import Modal from "../modal";
import AddIcon from '@mui/icons-material/Add';

import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import DnsIcon from '@mui/icons-material/Dns';
import Search from "../search";

const Navbar = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [mob, setMob] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleCloseMenu = () => {
        setAnchorEl(null);
      };

    const mobRes = () => {
        const innerWidth = window.innerWidth;
        if(innerWidth < 650) {
            setMob(true)
        } else {
            setMob(false)
        }
    }

    React.useEffect(() => {
        mobRes()

        window.addEventListener('resize', mobRes)
    }, [])

    return (
        <Box sx={{ flexGrow: 1, marginBottom: "85px" }}>
            <AppBar
                position="fixed"
                sx={{ background: "#443C68", textDecoration: "none" }}
            >
                <Container maxWidth={"lg"}>
                    <Toolbar>
                        
                        <Box sx={{height: '100%', flexGrow: 1}}>
                            <Link to="/" style={{display: 'block', width: 'fit-content'}} title="Clean YouTube">
                                <img src="/logo.png" alt="" height={50} style={{margin: "auto 0", display: 'block'}} />
                            </Link>
                        </Box>
                        <Search mob={mob} />
                        {!mob ? (
                            <>
                                {/* <IconButton
                                    color="primary"
                                    sx={{ color: "#fff" }}
                                    to="/"
                                    component={Link}
                                >
                                    <HomeIcon />
                                </IconButton> */}
                                <IconButton
                                    color="primary"
                                    sx={{ color: "#fff" }}
                                    to="/favourites"
                                    component={Link}
                                    title="Favourites"
                                >
                                    <FavoriteIcon />
                                </IconButton>
                                {/* <IconButton
                                    color="primary"
                                    sx={{ color: "#fff" }}
                                    to="/recents"
                                    component={Link}
                                >
                                    <HistoryIcon />
                                </IconButton> */}
                                
                                {/* <Box style={{margin: '8px'}}></Box> */}

                                <IconButton
                                    color="primary"
                                    sx={{ color: "#fff" }}
                                    to="/videos"
                                    component={Link}
                                    title="Videos"
                                >
                                    <VideoLibraryIcon />
                                </IconButton>
                                <IconButton
                                    color="primary"
                                    sx={{ color: "#fff" }}
                                    to="/playlists"
                                    component={Link}
                                    title="Playlists"
                                >
                                    <DnsIcon />
                                </IconButton>
                                <IconButton
                                    color="primary"
                                    sx={{ color: "#fff" }}
                                    to="/channels"
                                    component={Link}
                                    title="Channels"
                                >
                                    <MovieFilterIcon />
                                </IconButton>
                                <Button
                                    variant="contained"
                                    sx={{ mx: 1, background: "#635985" }}
                                    color="secondary"
                                    onClick={handleClickOpen}
                                    title="Add New"
                                >
                                    Add
                                </Button>
                            </>
                        ) : (
                            <>
                                <IconButton
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={handleClick}
                                >
                                    <MenuIcon />
                                </IconButton>

                                <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleCloseMenu}
                                style={{justifyContent: 'center'}}
                                >
                                    <MenuItem onClick={handleCloseMenu} component={Link} to="/" >
                                        <ListItemIcon>
                                            <HomeIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary="Home" />
                                    </MenuItem>
                                    <MenuItem onClick={handleCloseMenu} component={Link} to="/favourites">
                                        <ListItemIcon>
                                            <FavoriteIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary="Favourites" />
                                    </MenuItem>
                                    <MenuItem onClick={handleCloseMenu} component={Link} to="/recents">
                                        <ListItemIcon>
                                            <HistoryIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary="Recents" />
                                    </MenuItem>
                                    
                                    <Box style={{margin: '8px'}}></Box>

                                    <MenuItem onClick={handleCloseMenu} component={Link} to="/videos">
                                        <ListItemIcon>
                                            <VideoLibraryIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary="Videos" />
                                    </MenuItem>
                                    <MenuItem onClick={handleCloseMenu} component={Link} to="/playlists">
                                        <ListItemIcon>
                                            <DnsIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary="Playlists" />
                                    </MenuItem>
                                    <MenuItem onClick={handleCloseMenu} component={Link} to="/channels">
                                        <ListItemIcon>
                                            <MovieFilterIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary="Channels" />
                                    </MenuItem>
                                    <MenuItem onClick={handleCloseMenu}>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            sx={{ width: "100%", color: "#635985", borderColor: "#635985" }}
                                            color="secondary"
                                            onClick={handleClickOpen}
                                            startIcon={<AddIcon/>}
                                        >
                                            Add New
                                        </Button>
                                    </MenuItem>
                                </Menu>
                            </>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>
            <Modal open={open} handleClose={handleClose} />
        </Box>
    );
};

export default Navbar;
