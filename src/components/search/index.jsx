import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useNavigate} from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

export default function Search() {
  let [searchParams, setSearchParams] = useSearchParams();

  const [type, setType] = React.useState('video'); // set default value "earchParams.get('q')||'video" to set previous filter
  const [q, setQ] = React.useState(searchParams.get('q')||'')

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  const handleText = (e) => {
    setQ(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if(!q) {
      alert('Enter a valid search query');
      return;
    }

    const query = encodeURIComponent(q).replace(/%20/g, '+');
    
    setSearchParams({q:query,type});
    navigate(`/search?q=${query}&type=${type}`)
  }

  // Open the menu when the IconButton is clicked
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close the menu when an item is clicked or when clicking outside the menu
  const handleClose = (value) => {
    if(value) {
      if(value === 'playlist') {
        setType('playlist')
      } else if(value === 'channel') {
        setType('channel')
      } else {
        setType('video')
      }
    }
    setAnchorEl(null);
  };

  // On change filter instantly search about this
  // React.useEffect(() => {
  //   setSearchParams({q,type})
  // }, [type])

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{ 
        p: '1px 4px',
        m: 'auto 15px',
        display: 'flex',
        alignItems: 'center',
        width: 380,
        // background: '#ccc',
        borderRadius: '50px',
      }}
    >
      
      <InputBase
        sx={{ ml: 1.5, flex: 1 }}
        placeholder={`Search ${type[0].toUpperCase()+type.slice(1)}s On YouTube`}
        inputProps={{ 'aria-label': 'search on Youtube' }}
        value={q}
        onChange={handleText}
      />
      
      
  

      <IconButton onClick={handleClick} type="button" color='secondary' sx={{ p: '8px 10px' }} aria-label="search" title="Filter">
        <TuneIcon />
      </IconButton>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleClose('video')}>Video</MenuItem>
        <MenuItem onClick={() => handleClose('playlist')}>Playlist</MenuItem>
        <MenuItem onClick={() => handleClose('channel')}>Channel</MenuItem>
      </Menu>

      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton type="submit" color='secondary' sx={{ p: '8px 10px' }} aria-label="search" title="Search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}


