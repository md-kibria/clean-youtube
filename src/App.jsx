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

const App = () => {
    return (
        <BrowserRouter>
            <CssBaseline />
            <Navbar />
            <ToastContainer />
            <Container maxWidth={"lg"}>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/favourites" element={<Favourites/>} />
                    <Route path="/recents" element={<Recents />} />
                    <Route path="/playlist/:id" element={<Playlist />} />
                    <Route path="/playlist/:playlistId/video/:videoId" element={<Player />} />
                    <Route path="/404/:msg" element={<NotFound />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Container>
        </BrowserRouter>
    );
};

export default App;
