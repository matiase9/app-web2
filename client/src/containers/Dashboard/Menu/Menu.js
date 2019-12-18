import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

class Menu extends Component {
    render () {
        return (
            <div className={useStyles.root}>
                <h2>API</h2>
                <Paper className={useStyles.paper}>
                    <MenuList>
                    <MenuItem>Clients</MenuItem>
                    <MenuItem>Policies</MenuItem>
                    </MenuList>
                </Paper>
                
            </div>
 
        );
    }
}


export default Menu;