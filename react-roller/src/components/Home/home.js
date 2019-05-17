import React, { Component } from 'react';
import TopBar from '../TopBar/topBar'
import BottomBar from '../BottomBar/bottomBar'
import BottomBarUsername from '../BottomBarUsername/bottomBarUsername'
import RollHistory from '../paper/paperSub'

class home extends Component {
    render() {
        if(this.props.state.username){
            return (
                <div style={styles.appContainer}>
                    <TopBar/>
                    <RollHistory style={{ flex: 1, }}/>
                    <BottomBar getDiceNumber={this.props.getDiceNumber} setDiceNumber={this.props.setDiceNumber}/>
                </div>
            );
        } else {
            return (
                <div>
                    <TopBar/>
                    <RollHistory/>
                    <BottomBarUsername getNewUsername={this.props.getNewUsername} setNewUsername={this.props.setNewUsername} getKeyPress={this.props.getKeyPress}/>
                </div>
            )
        }

    }
}
const styles = {
    appContainer: {
        flex: 1,
        // display: "flex",
        // flexDirection: "column",
        // justifyContent: "space-between",
        height: "100vh"


    }
}
export default home;

