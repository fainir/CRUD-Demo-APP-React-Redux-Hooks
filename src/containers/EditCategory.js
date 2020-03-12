import React, { Fragment, useState } from 'react';
import { useParams } from 'react-router';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function EditCategory() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const categories = useSelector((state) => state.categories);
  const category = categories.find((obj) => obj.id === id);
  dispatch({ type: 'SELECT_CATEGORY', payload: id });
  dispatch({ type: 'ADD_MENU_DATA', payload: { pageTitle: 'Edit Category', menuButtons: [] } });
  const history = useHistory();
  const [categoryName, setCategoryName] = useState('');
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [inputError, setInputError] = React.useState(false);
  if (category && category.name && categoryName.length < 1) {
    setCategoryName(category.name);
  }

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
      dispatch({ type: 'UPDATE_SELECTED_CATEGORY', payload: categoryName });
      setOpenSnackbar(true);
      setInputError(false);
    } else {
      setInputError(true);
    }
  };

  return (
    <Fragment>
      {category
        && (
          <>
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

          </>
        )}
    </Fragment>
  );
}

export default EditCategory;
