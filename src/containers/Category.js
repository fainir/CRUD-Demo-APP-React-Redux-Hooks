import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

function Category() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const categories = useSelector((state) => state.categories);
  const category = categories.find((obj) => obj.id === id);
  dispatch({ type: 'SELECT_CATEGORY', payload: id });
  dispatch({ type: 'ADD_MENU_DATA', payload: { pageTitle: 'Category', menuButtons: [] } });

  return (
    <Fragment>
      {category
          && (
            <>
              <Helmet>
                <title>
                  {category.name}
                  {' '}
                  - myLocations
                </title>
                <meta name="description" content={`${category.name} - myLocations`} />
              </Helmet>
              <h1>{`Category Name: ${category.name}`}</h1>
            </>
          )}
    </Fragment>
  );
}

export default Category;
