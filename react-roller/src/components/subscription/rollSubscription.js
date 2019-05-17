import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import { Subscription } from 'react-apollo';
import gql from 'graphql-tag';
const RollSub = (classes) => {

    <Subscription 
    subscription={
        gql`
        subscription {
            Turns {
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
}
export default RollSub