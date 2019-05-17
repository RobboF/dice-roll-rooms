import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import RoomIcon from '@material-ui/icons/MeetingRoomOutlined';
class topBar extends Component {
    render() {
        return (
            <div style={styles.root}>
                <AppBar position="static" className="fixed-top">
                    <Toolbar>
                    <IconButton color="inherit" aria-label="Menu" style={styles.menuButton}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" style={styles.grow}>
                        Rob's Dice Roller
                    </Typography>
                    <IconButton color="inherit">
                        <RoomIcon></RoomIcon>
                    </IconButton>
                    {/* <Button color="inherit">Rooms</Button> */}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default topBar;

const styles = {
    root: {
      flexGrow: 1,
      height: 64
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
  };