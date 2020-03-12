import React, {Fragment, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import { Helmet } from 'react-helmet';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function NewCategory() {
  const dispatch = useDispatch();
  dispatch({ type: 'ADD_MENU_DATA', payload: { pageTitle: 'New Category', menuButtons: [] } });
  const history = useHistory();
  const [categoryName, setCategoryName] = useState('');
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [inputError, setInputError] = React.useState(false);

  const action = (
    <Button onClick={() => history.push('/')} style={{ color: '#ffffff' }} size="small">
      View
    </Button>
  );

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleSubmit = () => {
    if (categoryName.length >= 1) {
      dispatch({ type: 'CREATE_CATEGORY', payload: categoryName });
      setCategoryName('');
      setOpenSnackbar(true);
      setInputError(false);
    } else {
      setInputError(true);
    }
  };

  return (
    <Fragment>
      <Helmet>
        <title>New Category - myLocations</title>
        <meta name="description" content="New Category" />
      </Helmet>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert action={action} onClose={handleClose} severity="success">
          Category added successfully!
        </Alert>
      </Snackbar>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <div>
          <TextField
            style={{ margin: 15 }}
            variant="outlined"
            helperText={inputError ? 'Category name required' : ''}
            error={inputError}
            id="standard-basic"
            label="Category Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>
        <div>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </Grid>
    </Fragment>
  );
}

export default NewCategory;
