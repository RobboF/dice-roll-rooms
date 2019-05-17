import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/AddBox'
import AppBar from '@material-ui/core/AppBar';

const styles = {
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    // width: '9%',
    flexGrow: 1, 
    margin: 10,
    height: 40
  },
  input: {
    marginLeft: 8,
    marginRight: 10,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
  bottomAppContainer: {
     bottom: 0,
     position: "absolute"
    // top: 'auto',
  }
};

function CustomizedInputBase(props) {
  const { classes } = props;
  return (
    <AppBar position="static" styles={styles.bottomAppContainer}>
        <Paper className={classes.root} elevation={1}>
        {/* <InputBase className={classes.input} placeholder="Set Username" onChange={(e) => {props.getNewUsername(e)}}/> */}
        <InputBase className={classes.input} placeholder="Set Username" onChange={(e) => {props.getNewUsername(e.target.value)}} onKeyPress={(event)=>{props.getKeyPress(event)}}/>        
        <Divider className={classes.divider} />
        <IconButton color="primary" className={classes.iconButton} aria-label="Directions" onClick={() =>{props.setNewUsername();}} >
            <AddIcon />
        </IconButton>
        </Paper>
    </AppBar>
  );
}



CustomizedInputBase.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedInputBase);