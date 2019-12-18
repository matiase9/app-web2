import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Clients from './List/Clients';
import Menu from './Menu/Menu';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

class Dashboard extends Component {
    
    render () {
        return (
            <div className={useStyles.root}>
                <Grid container spacing={3}>
                    {/* <Grid item xs={12}>
                    <Paper className={useStyles.paper}>Filters</Paper>
                    </Grid> */}
                    <Grid item xs={3}>
                    <Paper className={useStyles.paper}><Menu/></Paper>
                    </Grid>
                    <Grid item xs={7}>
                    <Paper className={useStyles.paper}><Clients/></Paper>
                    </Grid>
                </Grid>
            </div>
            
        );
    }
}

export default  Dashboard;