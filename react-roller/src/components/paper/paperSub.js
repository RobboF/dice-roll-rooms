import React, {useRef, useLayoutEffect} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import { Subscription } from 'react-apollo';
import gql from 'graphql-tag';
import * as ReactDOM from 'react-dom';
import { Paper } from '@material-ui/core';
const styles = theme => ({
  cardGroup:{
    height: "calc(100vh - 124px)",
    overflowY: "auto",
  },
  root: {
    width: '100%',
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  }
});



class ControlledExpansionPanels extends React.Component {
  state = {
    expanded: null,
    data: ""
  };
  scrollToBottom = () => {
            document.getElementById('lastMessage').scrollIntoView({ behavior: "instant" });
          }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };


  
  
  render() {
    const { classes } = this.props;
    const { expanded } = this.state;
  return(
    <Paper style={{height: "calc(100vh - 124px)", overflowY: "auto", }}>
    <div className={classes.root} >
    <Subscription  
          
         subscription={
           gql`
           subscription {
             Turns(order_by: {turnID: asc}) {
               hits
               misses
               turnRolls
               username
               turnID
              }
            }
            
            `}
            >
         {({ loading, error, data }) => {
           
           if (loading) return <p> Loading</p>
           if (error) {console.log(error);return <p> Error </p>}

           return data.Turns.map(({ hits, misses, turnRolls, username, turnID}) =>(
             <ExpansionPanel expanded={expanded ===  "expand" + turnID} onChange={this.handleChange("expand" + turnID)} key={"card"+turnID}>
            <ExpansionPanelSummary>
              <Typography className={classes.heading} style={{textAlign: "left"}}>{username}</Typography>
              <div style={{flexDirection: "row", display: "flex", justifyContent: "space-around", width: '100%'}}>
              <div/>

              <div>
                <Typography className={classes.secondaryHeading}>Hits: {hits}</Typography>
              </div>
              <div>
                <Typography className={classes.secondaryHeading}>Misses: {misses}</Typography>
              </div>
              </div>

            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{ flexDirection:"column", justifyContent: "space-around", width: "100%", alignItems: "center"}}>
              <div>
                <Typography>
                  Dice Rolled:
                </Typography>
                <Typography>
                  {turnRolls.replace(/,/g, ' ')}
                </Typography>
              </div>
              <div>
                
                <Typography style={{overflow: "auto"}}>
                  Total: {turnRolls.replace(/,/g, '').length}
                </Typography>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
              ));
            }}  
        </Subscription>
            <div style={{ float:"left", clear: "both" }}
               ref={(el) => { this.messagesEnd = el; }}>
            </div>

      </div>
      </Paper>
      

  )
  }
}

ControlledExpansionPanels.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlledExpansionPanels);