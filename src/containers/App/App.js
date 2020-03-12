import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Categories from '../Categories';
import NewCategory from '../NewCategory';
import TopBar from '../TopBar';
import Category from '../Category';
import EditCategory from '../EditCategory';

function App() {
  return (
    <div className="App">
      <Helmet
        defaultTitle="myLocations"
      >
        <meta name="description" content="Locations in categories" />
      </Helmet>
      <BrowserRouter>
        <TopBar />
        <Route
          path="/"
          exact
          render={() => (<Categories />)}
        />
        <Route
          path="/newcategory"
          exact
          render={() => (<NewCategory />)}
        />
        <Route
          path="/category/:id"
          exact
          render={() => (<Category />)}
        />
        <Route
          path="/category/:id/edit"
          exact
          render={() => (<EditCategory />)}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
