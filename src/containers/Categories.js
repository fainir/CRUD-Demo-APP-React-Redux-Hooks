import React, { Fragment, useState } from 'react';
import { Helmet } from 'react-helmet';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Divider from '@material-ui/core/Divider';

function Categories() {
  const [buttons, setButtons] = useState(['Add']);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  dispatch({ type: 'ADD_MENU_DATA', payload: { pageTitle: 'Categories', menuButtons: buttons } });
  const categories = useSelector((state) => state.categories);

  const handleListItemClick = (event, id) => {
    if (selectedIndex === id) {
      setSelectedIndex(null);
      setButtons(['Add']);
      dispatch({ type: 'SELECT_CATEGORY', payload: '' });
    } else {
      setSelectedIndex(id);
      setButtons(['View', 'Edit', 'Delete']);
      dispatch({ type: 'SELECT_CATEGORY', payload: id });
    }
  };

  return (
    <Fragment>
      <Helmet>
        <title>Categories - myLocations</title>
        <meta name="description" content="List of categories" />
      </Helmet>
      {categories.length >= 1
        ? (
          <List component="nav" aria-label="main mailbox folders">
            {categories.map((value) => {
              return (
                <Fragment key={value.id}>
                  <ListItem
                    button
                    selected={selectedIndex === value.id}
                    onClick={(event) => handleListItemClick(event, value.id)}
                  >
                    <ListItemText primary={value.name} />
                  </ListItem>
                  <Divider />
                </Fragment>
              );
            })}
          </List>
        )
        : (
          <Fragment>
            <Typography style={{ margin: 15 }} variant="h4">Categories not added yet</Typography>
            <Button onClick={() => history.push('/newcategory')} color="primary" variant="contained">Add your first Category!</Button>
          </Fragment>
        )}

    </Fragment>
  );
}

export default Categories;
