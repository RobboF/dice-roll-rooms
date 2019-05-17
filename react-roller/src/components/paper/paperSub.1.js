import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Subscription } from 'react-apollo';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';




class rollHistory extends Component {
  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };
  componentDidMount() {
    this.scrollToBottom();
    console.log("hi")
  }

  componentDidUpdate() {
    this.scrollToBottom();
    console.log("yeet")
  }

  scrollToBottom() {
    this.el.scrollIntoView({ behavior: 'smooth' });
  }

  
    render() {
        const subscriptionData = () => (
          <Paper style={styles.cardGroup}>
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
                
                return data.Turns.map(({ hits, misses, turnRolls, username, turnID}) => (
                  <Card style={styles.container} key={"card" + turnID}>
                  <CardContent style={styles.username}>
                    <Typography variant="h6">{username}:</Typography>
                  </CardContent>
                  {/* <CardContent style={styles.rolls}>
                    <Typography>{turnRolls}</Typography>
                  </CardContent>  */}
                  <div style={styles.resultGroup}>
                    <CardContent style={styles.hits}>
                      <Typography>H: {hits}</Typography>
                    </CardContent>
                    <CardContent style={styles.misses}>
                      <Typography>M: {misses}</Typography>
                    </CardContent>
                  </div>
                  
                </Card>
                ));
              }}          
           </Subscription>
              </Paper>
        );
        return (
          <div>
            {subscriptionData()}
            <div ref={el => { this.el = el; }} />
          </div>
        )
    }
}

export default rollHistory;

const styles = {

    container: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    username: {
      alignSelf: "flexStart",
      fontWeight: "bold"
    },
    resultGroup: {
      flexDirection: "row",
      display: "flex",

    },
    rolls: {
      flexWrap: "wrap"
    },
    cardGroup:{
      height: "calc(100vh - 124px)",
      overflowY: "auto",
    }
  };