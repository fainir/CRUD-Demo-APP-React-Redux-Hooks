import React, { useState } from 'react';
import './App/App.css';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import ViewIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import { Tooltip } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

function TopBar() {
  const useStyles = makeStyles((theme) => ({
    title: {
      flexGrow: 1,
    },
    homeIcon: { color: '#ffffff' },
    editButton: { margin: 0, marginLeft: 5, marginRight: 5 },
  }));
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const selectedCategoryId = useSelector((state) => state.selectedCategoryId);
  const pageTitle = useSelector((state) => state.pageTitle);
  const buttons = useSelector((state) => state.menuButtons);

  return (
    <AppBar position="static">
      <Toolbar>
        <Tooltip title="Home">
          <Link to="/">
            <HomeIcon className={classes.homeIcon} />
          </Link>
        </Tooltip>
        <Typography variant="h6" className={classes.title}>
          {pageTitle}
        </Typography>
        <div>
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
          >
            {buttons && buttons.includes('View')
          && (
          <Tooltip title="View Category">
            <Button
              variant="contained"
              onClick={() => history.push(`/category/${selectedCategoryId}`)}
            >
              <ViewIcon />
            </Button>
          </Tooltip>
          )}
            {buttons && buttons.includes('Edit')
          && (
          <Tooltip title="Edit Category">
            <Button
              variant="contained"
              onClick={() => history.push(`/category/${selectedCategoryId}/edit`)}
              className={classes.editButton}
            >
              <EditIcon />
            </Button>
          </Tooltip>
          )}
            {buttons && buttons.includes('Delete')
          && (
          <Tooltip title="Delete Category">
            <Button variant="contained" onClick={() => { setOpenDeleteDialog(true); }}><DeleteIcon /></Button>
          </Tooltip>
          )}
            {buttons && buttons.includes('Add')
          && (
          <Tooltip title="New Category">
            <Button variant="contained" aria-label="add" onClick={() => history.push('/newcategory')}>
              <AddIcon />
            </Button>
          </Tooltip>
          )}
          </Grid>
        </div>
      </Toolbar>
      <Dialog
        open={openDeleteDialog}
        onClose={() => { setOpenDeleteDialog(false); }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Are you sure you want to delete this category?</DialogTitle>
        <DialogActions>
          <Button onClick={() => { setOpenDeleteDialog(false); }} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              setOpenDeleteDialog(false);
              dispatch({ type: 'DELETE_SELECTED_CATEGORY' });
            }}
            color="primary"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
}

export default TopBar;
