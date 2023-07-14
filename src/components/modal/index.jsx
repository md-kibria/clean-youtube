import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useStoreActions, useStoreState } from 'easy-peasy';
import {ProgressBar} from 'react-loader-spinner'
import { toast } from 'react-toastify';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';

const Modal = ({open, handleClose}) => {

  const [type, setType] = React.useState('channel')
  const [input, setInput] = React.useState('')
  // const getPlaylist = useStoreActions(state => state.playlists.getPlaylist)
  const {videos: {getVideo}, playlists: {getPlaylist}, channels: {getChannel}} = useStoreActions(state => state)
  
  const {setError: setErrorV, setLoading: setLoadingV} = useStoreActions(state => state.videos)
  const {setError: setErrorP, setLoading: setLoadingP} = useStoreActions(state => state.playlists)
  const {setError: setErrorC, setLoading: setLoadingC} = useStoreActions(state => state.channels)

  const {error: errorV, isLoading: isLoadingV} = useStoreState(state => state.videos)
  const {error: errorP, isLoading: isLoadingP} = useStoreState(state => state.playlists)
  const {error: errorC, isLoading: isLoadingC} = useStoreState(state => state.channels)

  const [loading, setLoading] = React.useState(false)
  const [t, setT] = React.useState(false)

  const handleAdd = async () => {
    let id = input

    // Need to modify based on video and channel
    if(input.search(/youtube.com/i) !== -1) {
      if(input.search(/watch/i) !== -1) {
        id = input.substring(input.search(/watch\?v=/)+8)
      } else if(input.search(/playlist/i) !== -1) {
        id = input.substring(input.search(/PL/))
      } else if(input.search(/channel/i) !== -1) {
        id = input.substring(input.search(/UC/))
      }
    }

    if(type === 'video') {
      getVideo(id)
    } else if(type === 'playlist') {
      getPlaylist(id)
    } else if(type === 'channel') {
      getChannel(id)
    } else {
      throw new Error('Something went wrong! Please select a valid type.')
    }

    setT(true)

  }

  const handleModalClose = () => {
    // setInput('') // If I call this function, I need to clear error
    handleClose()

    setErrorV('')
    setErrorP('')
    setErrorC('')

    setLoadingV(false)
    setLoadingP(false)
    setLoadingC(false)
  }

  React.useEffect(() => {
    if(type === 'video') {
      setLoading(isLoadingV)
    } else if(type === 'playlist') {
      setLoading(isLoadingP)
    } else if(type === 'channel') {
      setLoading(isLoadingC)
    }
    
    if(type === 'video') {
      if(!errorV && !isLoadingV) {
        setInput('')
        handleClose()
   
        if(t) {
          toast.success("Video added successfully", {
            position: 'bottom-left',
            autoClose: 2000
          })
        }
      }
    } else if(type === 'playlist') {
      if(!errorP && !isLoadingP) {
        setInput('')
        handleClose()
   
        if(t) {
          toast.success("Playlist added successfully", {
            position: 'bottom-left',
            autoClose: 2000
          })
        }
      }
    } else if(type === 'channel') {
      if(!errorC && !isLoadingC) {
        setInput('')
        handleClose()
   
        if(t) {
          toast.success("Channel added successfully", {
            position: 'bottom-left',
            autoClose: 2000
          })
        }
      }
    } else {
      throw new Error('Something went wrong! bla bla bla...')
    }
   
  }, [isLoadingV, isLoadingP, isLoadingC])

  React.useEffect(() => {
    if(localStorage.getItem('cy-type')) {
      setType(localStorage.getItem('cy-type'))
    }
  }, [])

  const changeType = (e) => {
    setType(e.target.value)

    localStorage.setItem('cy-type', e.target.value)
  }

  return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New</DialogTitle>
        <DialogContent>
          <DialogContentText>
          {/* To add a new playlist please insert the playlist id or playlist link.
            Please make sure the link is correct. Otherwise we won't able to fetch the playlist information */}
          To add a new playlist or video or channel please insert the id or link.
            Please make sure the link or id is correct. Otherwise we won't able to fetch the data.
          </DialogContentText>
          <FormControl component="fieldset">
            <RadioGroup row aria-label="id" name="id" value={type} onChange={changeType} style={{display: 'flex'}}>
              <FormControlLabel value="video" control={<Radio />} label="Video" />
              <FormControlLabel value="playlist" control={<Radio />} label="Playlist" />
              <FormControlLabel value="channel" control={<Radio />} label="Channel" />
            </RadioGroup>
          </FormControl>
          
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={type[0].toUpperCase() + type.slice(1) + " ID or Link"}
            type="email"
            fullWidth
            variant="standard"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            error={type === 'video' ? Boolean(errorV) : type === 'playlist' ? Boolean(errorP) : Boolean(errorC)}
            helperText={type === 'video' ? errorV : type === 'playlist' ? errorP : errorC}
          />
        </DialogContent>
        <DialogActions sx={{position: 'relative', display: 'flex'}}>
        {/* {loading && <ProgressLoader />} */}
        { loading && <ProgressBar
                height="70"
                width="80"
                ariaLabel="progress-bar-loading"
                wrapperStyle={{position: 'absolute', left: 20, bottom: -5}}
                wrapperClass="progress-bar-wrapper"
                borderColor = '#18122B'
                barColor = '#635985'
            /> }
          <Button onClick={handleModalClose} disabled={loading}>Cancel</Button>
          <Button onClick={handleAdd} disabled={loading}>Add</Button>
        </DialogActions>
      </Dialog>
  );
}

export default Modal