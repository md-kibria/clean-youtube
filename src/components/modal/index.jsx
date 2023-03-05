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

const Modal = ({open, handleClose}) => {
  const [input, setInput] = React.useState('')
  const getPlaylist = useStoreActions(state => state.playlists.getPlaylist)
  const {error, isLoading} = useStoreState(state => state.playlists)
  const [loading, setLoading] = React.useState(false)
  const [t, setT] = React.useState(false)

  const handleAdd = async () => {
    let id = input

    if(input.search(/youtube.com/i) !== -1) {
      id = input.substring(input.search(/PL/))
    }

    getPlaylist(id)

    setT(true)

  }

  const handleModalClose = () => {
    // setInput('') // If I call this function, I need to clear error
    handleClose()
  }

  React.useEffect(() => {
    setLoading(isLoading)
    if(!error && !isLoading) {
      setInput('')
      handleClose()
 
      if(t) {
        toast.success("Playlist added successfully", {
          position: 'bottom-left',
          autoClose: 2000
        })
      }
    }
  }, [isLoading])

  return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Playlist</DialogTitle>
        <DialogContent>
          <DialogContentText>
          To add a new playlist please insert the playlist id or playlist link.
            Please make sure the link is correct. Otherwise we won't able to fetch the playlist information
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Playlist ID or Link"
            type="email"
            fullWidth
            variant="standard"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            error={error}
            helperText={error}
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
          <Button onClick={handleAdd} disabled={loading}>Add Playlist</Button>
        </DialogActions>
      </Dialog>
  );
}

export default Modal