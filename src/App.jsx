import { Container, CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Favourites from "./pages/favourites";
import Home from "./pages/home";
import NotFound from "./pages/notFound";
import Player from "./pages/player";
import Playlist from "./pages/playlist";
import Recents from "./pages/recents";
import {ToastContainer} from 'react-toastify'
import Channel from "./pages/channel";
import Video from "./pages/video";
import Videos from "./pages/videos";
import Playlists from "./pages/playlists";
import Channels from "./pages/channels";
import Search from "./pages/search";

const App = () => {
    return (
        <BrowserRouter>
            <CssBaseline />
            <Navbar />
            <ToastContainer />
            <Container maxWidth={"lg"} px="2rem">
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/favourites" element={<Favourites/>} />
                    <Route path="/recents" element={<Recents />} />
                    <Route path="/videos" element={<Videos />} />
                    <Route path="/videos/:id" element={<Video />} />
                    <Route path="/playlists" element={<Playlists />} />
                    <Route path="/playlists/:id" element={<Playlist />} />
                    <Route path="/channels" element={<Channels />} />
                    <Route path="/channels/:id" element={<Channel />} />
                    <Route path="/playlists/:playlistId/video/:videoId" element={<Player />} />
                    <Route path="/404/:msg" element={<NotFound />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Container>
        </BrowserRouter>
    );
};

export default App;
